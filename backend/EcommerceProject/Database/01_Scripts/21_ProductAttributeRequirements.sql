USE [EcommerceDB];
GO

CREATE TABLE ProductAttributeRequirements (
    ProductId       INT NOT NULL,
    AttributeId     INT NOT NULL,
    PRIMARY KEY (ProductId, AttributeId),
    CONSTRAINT FK_PAR_Product FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE,
    CONSTRAINT FK_PAR_Attribute FOREIGN KEY (AttributeId) REFERENCES ProductAttributes(AttributeId) ON DELETE CASCADE
);
PRINT 'Table ProductAttributeRequirements created successfully.';
GO