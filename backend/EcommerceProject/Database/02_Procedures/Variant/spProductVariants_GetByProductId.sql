USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProductVariants_GetByProductId
(
    @ProductId INT,
    @OnlyActive BIT = 0
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        v.VariantId,
        v.ProductId,
        v.SKU,
        v.Price,
        v.StockQuantity,
        v.IsDefault,
        v.IsActive,
        v.CreatedAt,
        v.UpdatedAt
    FROM ProductVariants v
    WHERE
        v.ProductId = @ProductId
        AND (@OnlyActive = 0 OR v.IsActive = 1)
    ORDER BY
        v.IsDefault ASC,
        v.VariantId ASC;
END
GO
