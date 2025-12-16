USE [EcommerceDB];
GO

IF OBJECT_ID(N'catalog.ProductImages', N'U') IS NOT NULL
	DROP TABLE catalog.ProductImages;
GO

CREATE TABLE catalog.ProductImages (
    ProductImageId      INT IDENTITY(1,1) PRIMARY KEY,
    ProductId           INT NOT NULL,
    ImageUrl            VARCHAR(1024) NOT NULL,
    AltText             VARCHAR(250) NULL,
    SortOrder           INT NOT NULL DEFAULT 0,
    IsPrimary           BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_ProductImages_Product FOREIGN KEY (ProductId) REFERENCES catalog.Products(ProductId) ON DELETE CASCADE
);
CREATE INDEX IX_ProductImages_ProductId ON catalog.ProductImages(ProductId);
GO

PRINT 'Table catalog.ProductImages created successfully.';
GO