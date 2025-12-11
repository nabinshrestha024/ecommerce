USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'Products', N'U') IS NOT NULL
	DROP TABLE Products;
GO

CREATE TABLE Products (
    ProductId     INT IDENTITY(1,1) PRIMARY KEY,
    CategoryId    INT NULL REFERENCES Categories(CategoryId),
    Sku           VARCHAR(100) NULL UNIQUE,
    Name          VARCHAR(250) NOT NULL,
    Brand         VARCHAR(200) NULL,
    ShortDescription VARCHAR(1000) NULL,
    Description   VARCHAR(MAX) NULL,
    Price         DECIMAL(18,2) NOT NULL,
    CostPrice     DECIMAL(18,2) NULL,
    WeightKg      DECIMAL(10,3) NULL,
    IsActive      BIT NOT NULL DEFAULT 1,
    CreatedAt     DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt     DATETIME2 NULL
);
CREATE INDEX IX_Products_Name ON Products(Name);
GO

PRINT 'Table Products created successfully.';
GO