USE [EcommerceDB];
GO

IF OBJECT_ID(N'catalog.Products', N'U') IS NOT NULL
	DROP TABLE catalog.Products;
GO

CREATE TABLE catalog.Products (
    ProductId           INT IDENTITY(1,1) PRIMARY KEY,
    CategoryId          INT NULL,
    BrandId             INT NULL,
    Sku                 VARCHAR(100) NULL UNIQUE,
    Name                VARCHAR(250) NOT NULL,
    ShortDescription    VARCHAR(1000) NULL,
    Description         VARCHAR(MAX) NULL,
    Price               DECIMAL(18,2) NOT NULL,
    CostPrice           DECIMAL(18,2) NULL,
    IsActive            BIT NOT NULL DEFAULT 1,
    IsFeatured          BIT NOT NULL DEFAULT 0, 
    CreatedAt           DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt           DATETIME2 NULL,
    CONSTRAINT FK_Products_Category FOREIGN KEY (CategoryId) REFERENCES catalog.Categories(CategoryId) ON DELETE SET NULL,
    CONSTRAINT FK_Products_Brands FOREIGN KEY (BrandId) REFERENCES catalog.Brands(BrandId) ON DELETE SET NULL
);
CREATE INDEX IX_Products_Name ON catalog.Products(Name);
GO

PRINT 'Table catalog.Products created successfully.';
GO