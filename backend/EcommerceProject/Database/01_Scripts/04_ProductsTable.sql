USE [EcommerceDB];
GO

CREATE TABLE Products (
    ProductID           INT PRIMARY KEY IDENTITY(1,1),
    Name                VARCHAR(200) NOT NULL,
    Slug                VARCHAR(200) UNIQUE NOT NULL,
    Description         VARCHAR(MAX),
    ShortDescription    VARCHAR(500),
    Price               DECIMAL(10,2) NOT NULL,
    CategoryID          INT NOT NULL,
    StockQuantity       INT DEFAULT 0,
    SKU                 VARCHAR(50) UNIQUE NOT NULL,
    Brand               VARCHAR(100),
    ProductImageURL     VARCHAR(500),
    IsActive            BIT DEFAULT 1,
    CreatedAt           DATETIME DEFAULT GETDATE(),
    UpdatedAt           DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID) ON DELETE CASCADE
);

PRINT 'Table Products created successfully.';
GO