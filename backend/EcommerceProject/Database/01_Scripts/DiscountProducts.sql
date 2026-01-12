USE [EcommerceDB]
GO


CREATE TABLE DiscountProducts (
    Id INT IDENTITY PRIMARY KEY,
    DiscountId INT NOT NULL,
    ProductId INT NOT NULL,
    CONSTRAINT FK_DP_Discount FOREIGN KEY (DiscountId) REFERENCES Discounts(DiscountId),
    CONSTRAINT FK_DP_Product FOREIGN KEY (ProductId) REFERENCES Products(ProductId),
    CONSTRAINT UQ_Discount_Product UNIQUE (DiscountId, ProductId)
);