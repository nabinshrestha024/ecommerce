USE EcommerceDB;
GO

-- 1. PRODUCTS

IF COL_LENGTH('Products', 'HasVariants') IS NULL
BEGIN
    ALTER TABLE Products
    ADD HasVariants BIT NOT NULL DEFAULT 0;
END
GO

-- 2. PRODUCT VARIANTS
IF OBJECT_ID('ProductVariants', 'U') IS NULL
BEGIN
    CREATE TABLE ProductVariants (
        VariantId       INT IDENTITY(1,1) PRIMARY KEY,
        ProductId       INT NOT NULL,
        SKU             VARCHAR(50) NOT NULL UNIQUE,
        Price           DECIMAL(10,2) NOT NULL,
        StockQuantity   INT NOT NULL DEFAULT 0,
        IsActive        BIT NOT NULL DEFAULT 1,
        CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
        UpdatedAt       DATETIME2(3) NULL,

        CONSTRAINT FK_ProductVariants_Product
            FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
            ON DELETE CASCADE
    );
END
GO

-- 3. PRODUCT ATTRIBUTES

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

-- 4. PRODUCT ATTRIBUTE VALUES

IF OBJECT_ID('ProductAttributeValues', 'U') IS NULL
BEGIN
    CREATE TABLE ProductAttributeValues (
        AttributeValueId    INT IDENTITY(1,1) PRIMARY KEY,
        AttributeId         INT NOT NULL,
        Value               VARCHAR(100) NOT NULL,
        CreatedAt           DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),

        CONSTRAINT FK_AttributeValue_Attribute
            FOREIGN KEY (AttributeId)
            REFERENCES ProductAttributes(AttributeId)
            ON DELETE CASCADE,

        CONSTRAINT UQ_Attribute_Value
            UNIQUE (AttributeId, Value)
    );
END
GO


-- 5. PRODUCT ATTRIBUTE ASSIGNMENTS (NON-VARIANT ATTRIBUTES)

IF OBJECT_ID('ProductAttributeAssignments', 'U') IS NULL
BEGIN
    CREATE TABLE ProductAttributeAssignments (
        ProductId           INT NOT NULL,
        AttributeValueId    INT NOT NULL,

        PRIMARY KEY (ProductId, AttributeValueId),

        CONSTRAINT FK_PAA_Product
            FOREIGN KEY (ProductId)
            REFERENCES Products(ProductId)
            ON DELETE CASCADE,

        CONSTRAINT FK_PAA_AttributeValue
            FOREIGN KEY (AttributeValueId)
            REFERENCES ProductAttributeValues(AttributeValueId)
            ON DELETE CASCADE
    );
END
GO

-- 6. VARIANT ATTRIBUTE VALUES (VARIANT ATTRIBUTES)

IF OBJECT_ID('VariantAttributeValues', 'U') IS NULL
BEGIN
    CREATE TABLE VariantAttributeValues (
        VariantId           INT NOT NULL,
        AttributeValueId    INT NOT NULL,

        PRIMARY KEY (VariantId, AttributeValueId),

        CONSTRAINT FK_VAV_Variant
            FOREIGN KEY (VariantId)
            REFERENCES ProductVariants(VariantId)
            ON DELETE CASCADE,

        CONSTRAINT FK_VAV_AttributeValue
            FOREIGN KEY (AttributeValueId)
            REFERENCES ProductAttributeValues(AttributeValueId)
            ON DELETE CASCADE
    );
END
GO

-- 7. PRODUCT IMAGES (OPTIONAL VARIANT)

IF COL_LENGTH('ProductImages', 'VariantId') IS NULL
BEGIN
    ALTER TABLE ProductImages
    ADD VariantId INT NULL;
END
GO

IF NOT EXISTS (
    SELECT 1 FROM sys.foreign_keys WHERE name = 'FK_ProductImages_Variant'
)
BEGIN
    ALTER TABLE ProductImages
    ADD CONSTRAINT FK_ProductImages_Variant
    FOREIGN KEY (VariantId)
    REFERENCES ProductVariants(VariantId)
    ON DELETE CASCADE;
END
GO

-- 8. SHOPPING CART

IF COL_LENGTH('ShoppingCarts', 'VariantId') IS NULL
BEGIN
    ALTER TABLE ShoppingCarts
    ADD VariantId INT NULL;
END
GO

-- 9. ORDER ITEMS

IF COL_LENGTH('OrderItems', 'VariantId') IS NULL
BEGIN
    ALTER TABLE OrderItems
    ADD VariantId INT NULL;
END
GO

PRINT '--- PRODUCT VARIANT SYSTEM INSTALLED SUCCESSFULLY ---';
GO
