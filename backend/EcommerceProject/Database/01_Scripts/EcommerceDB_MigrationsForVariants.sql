USE EcommerceDB;
GO

-- 1. Products table (add HasVariants column)

IF COL_LENGTH('Products', 'HasVariants') IS NULL
BEGIN
    ALTER TABLE Products ADD HasVariants BIT NOT NULL CONSTRAINT DF_Products_HasVariants DEFAULT 0;
END
GO

-- 2. ProductVariants (new table)

IF OBJECT_ID('ProductVariants', 'U') IS NULL
BEGIN
    CREATE TABLE ProductVariants (
        VariantId       INT IDENTITY(1,1) PRIMARY KEY,
        ProductId       INT NOT NULL,
        SKU             VARCHAR(50) NOT NULL UNIQUE,
        Price           DECIMAL(10,2) NOT NULL,
        StockQuantity   INT NOT NULL DEFAULT 0,
        IsActive        BIT NOT NULL DEFAULT 1,
        IsDefault       BIT NOT NULL DEFAULT 0,
        CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt       DATETIME2(3) NULL,

        CONSTRAINT FK_ProductVariants_Product FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE,
        CONSTRAINT UQ_ProductVariants_SKU UNIQUE (SKU)
    );
END
GO

-- 3.  Migrate existing product data to Default ProductVariants( with Data preservation)
IF COL_LENGTH('Products', 'SKU') IS NOT NULL
AND COL_LENGTH('Products', 'Price') IS NOT NULL
AND COL_LENGTH('Products', 'StockQuantity') IS NOT NULL
BEGIN
    INSERT INTO ProductVariants (
        ProductId,
        SKU,
        Price,
        StockQuantity,
        IsDefault
    )
    SELECT
        p.ProductId,
        CONCAT(p.SKU, '-DEFAULT'),
        p.Price,
        p.StockQuantity,
        1
    FROM Products p
    WHERE NOT EXISTS (
        SELECT 1 FROM ProductVariants v WHERE v.ProductId = p.ProductId
    );
END
GO

-- 4. Set HasVariants (all default to 0) for existing products

UPDATE Products SET HasVariants = 0;
GO

-- 5. Remove SKU, Price and StockQuantity from Products table 
-- (dynamically drop the unique constraint on SKU before dropping the column)

IF COL_LENGTH('Products', 'SKU') IS NOT NULL OR 
   COL_LENGTH('Products', 'Price') IS NOT NULL OR 
   COL_LENGTH('Products', 'StockQuantity') IS NOT NULL
BEGIN
    DECLARE @ColName NVARCHAR(100);
    DECLARE @TableID INT = OBJECT_ID('Products');
    DECLARE @SQL NVARCHAR(MAX);

    DECLARE col_cursor CURSOR FOR 
    SELECT name FROM sys.columns 
    WHERE object_id = @TableID AND name IN ('SKU', 'Price', 'StockQuantity');

    OPEN col_cursor;
    FETCH NEXT FROM col_cursor INTO @ColName;

    WHILE @@FETCH_STATUS = 0
    BEGIN
        SELECT @SQL = ISNULL(@SQL, '') + 'ALTER TABLE Products DROP CONSTRAINT ' + QUOTENAME(df.name) + ';'
        FROM sys.default_constraints df
        WHERE df.parent_object_id = @TableID AND df.parent_column_id = COLUMNPROPERTY(@TableID, @ColName, 'ColumnId');

        SELECT @SQL = ISNULL(@SQL, '') + 'ALTER TABLE Products DROP CONSTRAINT ' + QUOTENAME(uc.name) + ';'
        FROM sys.index_columns ic
        JOIN sys.indexes i ON ic.object_id = i.object_id AND ic.index_id = i.index_id
        JOIN sys.objects uc ON i.name = uc.name
        WHERE ic.object_id = @TableID AND ic.column_id = COLUMNPROPERTY(@TableID, @ColName, 'ColumnId')
        AND uc.type IN ('UQ', 'PK');

        IF @SQL IS NOT NULL
        BEGIN
            EXEC sp_executesql @SQL;
            SET @SQL = NULL;
        END

        -- drop the column
        SET @SQL = 'ALTER TABLE Products DROP COLUMN ' + QUOTENAME(@ColName) + ';';
        EXEC sp_executesql @SQL;
        SET @SQL = NULL;

        FETCH NEXT FROM col_cursor INTO @ColName;
    END

    CLOSE col_cursor;
    DEALLOCATE col_cursor;
END
GO


-- 6. ProductAttributes (new table)

IF OBJECT_ID('ProductAttributes', 'U') IS NULL
BEGIN
    CREATE TABLE ProductAttributes (
        AttributeId     INT IDENTITY(1,1) PRIMARY KEY,
        Name            VARCHAR(100) NOT NULL UNIQUE,
        IsVariant       BIT NOT NULL,
        CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- 7. ProductAttributeValues (new table)

IF OBJECT_ID('ProductAttributeValues', 'U') IS NULL
BEGIN
    CREATE TABLE ProductAttributeValues (
        AttributeValueId    INT IDENTITY(1,1) PRIMARY KEY,
        AttributeId         INT NOT NULL,
        Value               VARCHAR(100) NOT NULL,
        CreatedAt           DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),

        CONSTRAINT FK_AttributeValue_Attribute FOREIGN KEY (AttributeId) REFERENCES ProductAttributes(AttributeId) ON DELETE CASCADE,
        CONSTRAINT UQ_Attribute_Value UNIQUE (AttributeId, Value)
    );
END
GO

-- 8. ProductAttributeAssignments (a new table for product-level non-variant attributes)

IF OBJECT_ID('ProductAttributeAssignments', 'U') IS NULL
BEGIN
    CREATE TABLE ProductAttributeAssignments (
        ProductId           INT NOT NULL,
        AttributeValueId    INT NOT NULL,

        PRIMARY KEY (ProductId, AttributeValueId),
        CONSTRAINT FK_PAA_Product FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE,
        CONSTRAINT FK_PAA_AttributeValue FOREIGN KEY (AttributeValueId) REFERENCES ProductAttributeValues(AttributeValueId) ON DELETE CASCADE
    );
END
GO

-- 9. VariantAttributeValues (a new table for variant attributes)

IF OBJECT_ID('VariantAttributeValues', 'U') IS NULL
BEGIN
    CREATE TABLE VariantAttributeValues (
        VariantId           INT NOT NULL,
        AttributeValueId    INT NOT NULL,

        PRIMARY KEY (VariantId, AttributeValueId),
        CONSTRAINT FK_VAV_Variant FOREIGN KEY (VariantId)REFERENCES ProductVariants(VariantId) ON DELETE CASCADE,
        CONSTRAINT FK_VAV_AttributeValue FOREIGN KEY (AttributeValueId) REFERENCES ProductAttributeValues(AttributeValueId) ON DELETE CASCADE
    );
END
GO

-- 10. ProductImages (fix for variant association: add VariantId column)

IF COL_LENGTH('ProductImages', 'VariantId') IS NULL
BEGIN
    ALTER TABLE ProductImages ADD VariantId INT NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_ProductImages_Variant'
)
BEGIN
    ALTER TABLE ProductImages
    ADD CONSTRAINT FK_ProductImages_Variant FOREIGN KEY (VariantId) REFERENCES ProductVariants(VariantId) ON DELETE NO ACTION;
END
GO

-- 11. ShoppingCarts(add VariantId column)

IF COL_LENGTH('ShoppingCarts', 'VariantId') IS NULL
BEGIN
    ALTER TABLE ShoppingCarts ADD VariantId INT NULL;
END
GO

-- 12. Migrate existing ShoppingCart data to link to ProductVariants
UPDATE sc 
SET VariantId = pv.VariantId
FROM ShoppingCarts sc
JOIN ProductVariants pv ON pv.ProductId = sc.ProductId
AND pv.IsDefault = 1
WHERE sc.VariantId IS NULL;
GO

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_ShoppingCarts_Variant')
BEGIN
    ALTER TABLE ShoppingCarts ADD CONSTRAINT FK_ShoppingCarts_Variant FOREIGN KEY (VariantId) REFERENCES ProductVariants(VariantId) ON DELETE NO ACTION;
END
GO

-- 13. OrderItems (add VariantId column)

IF COL_LENGTH('OrderItems', 'VariantId') IS NULL
BEGIN
    ALTER TABLE OrderItems ADD VariantId INT NULL;
END
GO

-- 14. Migrate existing OrderItems data to link to ProductVariants
UPDATE oi
SET VariantId = pv.VariantId
FROM OrderItems oi
JOIN ProductVariants pv ON pv.ProductId = oi.ProductId
AND pv.IsDefault = 1
WHERE oi.VariantId IS NULL;
GO

IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_OrderItems_Variant')
BEGIN
    ALTER TABLE OrderItems ADD CONSTRAINT FK_OrderItems_Variant FOREIGN KEY (VariantId) REFERENCES ProductVariants(VariantId);
END
GO

-- 15. Wishlists (add VariantId column)

IF COL_LENGTH('Wishlists', 'VariantId') IS NULL
BEGIN
    ALTER TABLE Wishlists ADD VariantId INT NULL;
END
GO

-- 16. Migrate existing Wishlists data to link to ProductVariants
UPDATE w
SET VariantId = pv.VariantId
FROM Wishlists w
JOIN ProductVariants pv ON pv.ProductId = w.ProductId
AND pv.IsDefault = 1
WHERE w.VariantId IS NULL;
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_Wishlists_Variant'
)
BEGIN
    ALTER TABLE Wishlists
    ADD CONSTRAINT FK_Wishlists_Variant
        FOREIGN KEY (VariantId)
        REFERENCES ProductVariants(VariantId);
END
GO

-- 17. PurchaseOrderItems (add VariantId column)

IF COL_LENGTH('PurchaseOrderItems', 'VariantId') IS NULL
BEGIN
    ALTER TABLE PurchaseOrderItems ADD VariantId INT NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_PurchaseOrderItems_Variant'
)
BEGIN
    ALTER TABLE PurchaseOrderItems ADD CONSTRAINT FK_PurchaseOrderItems_Variant FOREIGN KEY (VariantId) REFERENCES ProductVariants(VariantId);
END
GO

-- 18. Discounts (add VariantId column)

IF COL_LENGTH('Discounts', 'VariantId') IS NULL
BEGIN
    ALTER TABLE Discounts ADD VariantId INT NULL;
END
GO
IF NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_Discounts_Variant')
BEGIN
    ALTER TABLE Discounts ADD CONSTRAINT FK_Discounts_Variant FOREIGN KEY (VariantId) REFERENCES ProductVariants(VariantId);
END
GO

-- 19. Reviews (add VariantId column)

IF COL_LENGTH('Reviews', 'VariantId') IS NULL
BEGIN
    ALTER TABLE Reviews ADD VariantId INT NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_Reviews_Variant'
)
BEGIN
    ALTER TABLE Reviews
    ADD CONSTRAINT FK_Reviews_Variant
        FOREIGN KEY (VariantId)
        REFERENCES ProductVariants(VariantId);
END
GO

PRINT 'Product to Variant migration completed successfully.';
GO

