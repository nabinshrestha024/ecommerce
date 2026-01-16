USE EcommerceDB
GO

CREATE OR ALTER PROCEDURE spDiscount_AddToVariants
(
    @DiscountId INT,
    @VariantId INT
)
AS
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM DiscountVariants
        WHERE DiscountId = @DiscountId AND VariantId = @VariantId
    )
    BEGIN
        INSERT INTO DiscountVariants (DiscountId, VariantId)
        VALUES (@DiscountId, @VariantId);
    END

        UPDATE ProductVariants
    SET DiscountId = @DiscountId
    WHERE VariantId = @VariantId;

   


END
