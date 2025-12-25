USE [EcommerceDB];
GO

CREATE TABLE Products (
    ProductId           INT IDENTITY(1,1) PRIMARY KEY,
    CategoryId          INT NOT NULL,
    Name                VARCHAR(200) NOT NULL,
    Slug                VARCHAR(200) NOT NULL UNIQUE,
    Description         VARCHAR(MAX) NULL,
    ShortDescription    VARCHAR(500) NULL,
    Price               DECIMAL(10,2) NOT NULL,
    StockQuantity       INT DEFAULT 0,
    SKU                 VARCHAR(50) NOT NULL UNIQUE,
    IsActive            BIT NOT NULL DEFAULT 1,
    CreatedAt           DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt           DATETIME2(3) NULL,
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId) ON DELETE NO ACTION
);

PRINT 'Table Products created.';
GO