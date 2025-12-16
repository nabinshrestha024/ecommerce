USE [EcommerceDB];
GO

IF OBJECT_ID(N'catalog.Brands', N'U') IS NOT NULL
     DROP TABLE catalog.Brands;
GO

CREATE TABLE catalog.Brands (
BrandId     INT IDENTITY(1,1) PRIMARY KEY,
Name        VARCHAR(300) NOT NULL UNIQUE,
Slug        VARCHAR(300) NULL,
Description VARCHAR(1000) NULL,
IsActive    BIT NOT NULL DEFAULT 1,
CreatedAt   DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

PRINT 'Table catalog.Brands created successfully.';
GO