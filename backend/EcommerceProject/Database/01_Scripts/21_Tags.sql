USE EcommerceDB;
GO

CREATE TABLE Tags (
    TagId INT IDENTITY(1,1) PRIMARY KEY,
    Name  VARCHAR(300) NOT NULL,
    CONSTRAINT UQ_Tags_Name UNIQUE (Name)
);

CREATE TABLE ProductTags (
    ProductTagId INT IDENTITY(1,1) PRIMARY KEY,
    ProductId    INT NOT NULL,
    TagId        INT NOT NULL,

    CONSTRAINT FK_ProductTags_Product 
        FOREIGN KEY (ProductId) 
        REFERENCES Products(ProductId) 
        ON DELETE CASCADE,

    CONSTRAINT FK_ProductTags_Tag 
        FOREIGN KEY (TagId) 
        REFERENCES Tags(TagId) 
        ON DELETE CASCADE,

    CONSTRAINT UQ_ProductTags_Product_Tag 
        UNIQUE (ProductId, TagId)
);

