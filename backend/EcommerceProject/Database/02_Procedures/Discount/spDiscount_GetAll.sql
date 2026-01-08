USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE dbo.spDiscount_GetAll
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
        

        -- Assigned Products
        (
            SELECT da.ProductId
            FROM DiscountAssigns da
            WHERE da.DiscountId = d.DiscountId
              AND da.ProductId IS NOT NULL
            FOR JSON PATH
        ) AS ProductIds,

        -- Assigned Variants
        (
            SELECT da.VariantId
            FROM DiscountAssigns da
            WHERE da.DiscountId = d.DiscountId
              AND da.VariantId IS NOT NULL
            FOR JSON PATH
        ) AS VariantIds

    FROM Discounts d
    ORDER BY d.DiscountId DESC;
END
GO
