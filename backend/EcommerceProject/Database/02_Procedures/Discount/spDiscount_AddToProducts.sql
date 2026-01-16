USE [EcommerceDB]
GO


CREATE OR ALTER   PROCEDURE [dbo].[spDiscount_AddToProducts]
(
    @DiscountId INT,
    @ProductId INT
)
AS
BEGIN

    IF NOT EXISTS (
        SELECT 1 FROM DiscountProducts
        WHERE DiscountId = @DiscountId AND ProductId = @ProductId
    )
    BEGIN
        INSERT INTO DiscountProducts (DiscountId, ProductId)
        VALUES (@DiscountId, @ProductId);
    END

            UPDATE ProductVariants
    SET DiscountId = @DiscountId
    WHERE   ProductId = @ProductId;
END
