USE [EcommerceDB];
GO

IF OBJECT_ID(N'catalog.ProductAttributes', N'U') IS NOT NULL
    DROP TABLE catalog.ProductAttributes;
GO

CREATE TABLE catalog.ProductAttributes (
    AttributeId     INT IDENTITY(1,1) PRIMARY KEY,
    Name            VARCHAR(200) NOT NULL,
    IsVariant       BIT NOT NULL DEFAULT 1 
);
GO

PRINT 'Table catalog.ProductAttributes created successfully.';
GO

IF OBJECT_ID(N'catalog.ProductAttributeValues', N'U') IS NOT NULL
    DROP TABLE catalog.ProductAttributeValues;
GO

CREATE TABLE catalog.ProductAttributeValues (
    AttributeValueId INT IDENTITY(1,1) PRIMARY KEY,
    AttributeId      INT NOT NULL,
    Value            VARCHAR(200) NOT NULL,

    CONSTRAINT FK_AttrValues_Attr 
        FOREIGN KEY (AttributeId) 
        REFERENCES catalog.ProductAttributes(AttributeId) 
        ON DELETE CASCADE
);
GO

PRINT 'Table catalog.ProductAttributeValues created successfully.';
GO
