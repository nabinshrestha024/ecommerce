CREATE TABLE DiscountAssigns(
    DiscountAssignId INT IDENTITY PRIMARY KEY,
    DiscountId INT NOT NULL,
    ProductId INT NULL,
    VariantId INT NULL
        CONSTRAINT FK_DVOP_Discount FOREIGN KEY (DiscountId)
        REFERENCES Discounts(DiscountId) ON DELETE CASCADE,

    CONSTRAINT FK_DVOP_Product FOREIGN KEY (ProductId)
        REFERENCES Products(ProductId),

    CONSTRAINT FK_DVOP_Variant FOREIGN KEY (VariantId)
        REFERENCES ProductVariants(VariantId),

    CONSTRAINT CK_DVOP_OnlyOne
        CHECK (
            (ProductId IS NOT NULL AND VariantId IS NULL)
         OR (ProductId IS NULL AND VariantId IS NOT NULL)
        ));
