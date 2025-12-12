USE [EcommerceDB];
GO

IF OBJECT_ID(N'catalog.ProductTags', N'U') IS NOT NULL
     DROP TABLE catalog.ProductTags;
GO
CREATE TABLE catalog.ProductTags (
ProductTagId    INT IDENTITY(1,1) PRIMARY KEY,
ProductId       INT NOT NULL,
TagId           INT NOT NULL,
CONSTRAINT FK_ProductTags_Product FOREIGN KEY (ProductId) REFERENCES catalog.Products(ProductId) ON DELETE CASCADE,
CONSTRAINT FK_ProductTags_Tag FOREIGN KEY (TagId) REFERENCES catalog.Tags(TagId) ON DELETE CASCADE,
CONSTRAINT UQ_Product_Tag UNIQUE (ProductId, TagId)
);
CREATE INDEX IX_ProductTags_ProductId ON catalog.ProductTags(ProductId);
GO

PRINT 'Table catalog.ProductTags created successfully.';
GO