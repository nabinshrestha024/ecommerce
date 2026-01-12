USE [EcommerceDB]
GO

CREATE TABLE DiscountVariants (
    Id INT IDENTITY PRIMARY KEY,
    DiscountId INT NOT NULL,
    VariantId INT NOT NULL,
    CONSTRAINT FK_DV_Discount FOREIGN KEY (DiscountId) REFERENCES Discounts(DiscountId),
    CONSTRAINT FK_DV_Variant FOREIGN KEY (VariantId) REFERENCES ProductVariants(VariantId),
    CONSTRAINT UQ_Discount_Variant UNIQUE (DiscountId, VariantId)
);