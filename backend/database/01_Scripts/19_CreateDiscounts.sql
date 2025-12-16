USE [EcommerceDB];
GO
IF OBJECT_ID(N'sales.Discounts', N'U') IS NOT NULL
     DROP TABLE sales.Discounts;
GO
CREATE TABLE sales.Discounts (
DiscountId          INT IDENTITY(1,1) PRIMARY KEY,
Code                VARCHAR(50) NOT NULL UNIQUE,
Description         VARCHAR(1000) NULL,
DiscountType        VARCHAR(50) NOT NULL, -- Percentage|Fixed
Value               DECIMAL(18,4) NOT NULL,
MaxDiscountAmount   DECIMAL(18,2) NULL,
StartAt             DATETIME2(3) NULL,
EndAt               DATETIME2(3) NULL,
IsActive            BIT NOT NULL DEFAULT 1,
CreatedAt           DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
);
GO
PRINT 'Table sales.Discounts created successfully.';
GO

-- DiscountProducts, DiscountCategories (junctions)
IF OBJECT_ID(N'sales.DiscountProducts', N'U') IS NOT NULL
     DROP TABLE sales.DiscountProducts;
GO
CREATE TABLE sales.DiscountProducts (
DiscountProductId   INT IDENTITY(1,1) PRIMARY KEY,
DiscountId          INT NOT NULL,
ProductId           INT NOT NULL,
CONSTRAINT FK_DiscountProducts_Discount FOREIGN KEY (DiscountId) REFERENCES sales.Discounts(DiscountId) ON DELETE CASCADE,
CONSTRAINT FK_DiscountProducts_Product FOREIGN KEY (ProductId) REFERENCES catalog.Products(ProductId) ON DELETE CASCADE,
CONSTRAINT UQ_Discount_Product UNIQUE (DiscountId, ProductId)
);
GO
PRINT 'Table sales.DiscountProducts created successfully.';
GO

IF OBJECT_ID(N'sales.DiscountCategories', N'U') IS NOT NULL
     DROP TABLE sales.DiscountCategories;
GO
CREATE TABLE sales.DiscountCategories (
DiscountCategoryId       INT IDENTITY(1,1) PRIMARY KEY,
DiscountId               INT NOT NULL,
CategoryId               INT NOT NULL,
CONSTRAINT FK_DiscountCategories_Discount FOREIGN KEY (DiscountId) REFERENCES sales.Discounts(DiscountId) ON DELETE CASCADE,
CONSTRAINT FK_DiscountCategories_Category FOREIGN KEY (CategoryId) REFERENCES catalog.Categories(CategoryId) ON DELETE CASCADE,
CONSTRAINT UQ_Discount_Category UNIQUE (DiscountId, CategoryId)
);
GO
PRINT 'Table sales.DiscountCategories created successfully.';
GO
