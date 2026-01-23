USE [EcommerceDB]
GO

CREATE OR ALTER PROCEDURE spDiscount_GetAll
(
    @SortOrder VARCHAR(10) ='desc'
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        d.DiscountId,
        d.DiscountName,
        d.DiscountType,
        d.DiscountValue,
        d.StartDate,
        d.EndDate,
        d.IsActive,

        (
            SELECT dp.ProductId
            FROM DiscountProducts dp
            WHERE dp.DiscountId = d.DiscountId
            FOR JSON PATH
        ) AS ProductIds,

        (
            SELECT dv.VariantId
            FROM DiscountVariants dv
            WHERE dv.DiscountId = d.DiscountId
            FOR JSON PATH
        ) AS VariantIds

    FROM Discounts d
    ORDER BY
    CASE WHEN @SortOrder = 'asc' THEN d.DiscountId END DESC,
    CASE WHEN @SortOrder = 'desc' THEN d.DiscountId END ASC;

END
