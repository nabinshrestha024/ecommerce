USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProducts_GetBySlugOrId
(
    @SlugOrId VARCHAR(200),
    @OnlyActive BIT = 1
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ProductId INT = TRY_CONVERT(INT, @SlugOrId);

    IF @ProductId IS NULL
    BEGIN
        SELECT @ProductId = ProductId FROM Products WHERE Slug = @SlugOrId;
    END

    SELECT TOP 1
        p.ProductId,
        p.CategoryId,
        c.Name AS CategoryName,
        p.Name,
        p.Slug,
        p.Description,
        p.ShortDescription,
        p.HasVariants,
        p.IsActive,
        COALESCE(v.Price, (SELECT TOP 1 Price FROM ProductVariants WHERE ProductId = p.ProductId ORDER BY Price ASC)) AS Price,
        COALESCE(v.StockQuantity, (SELECT TOP 1 StockQuantity FROM ProductVariants WHERE ProductId = p.ProductId ORDER BY Price ASC)) AS StockQuantity
    FROM Products p
    INNER JOIN Categories c ON p.CategoryId = c.CategoryId
    LEFT JOIN ProductVariants v ON v.ProductId = p.ProductId AND v.IsDefault = 1
    WHERE p.ProductId = @ProductId
      AND (@OnlyActive = 0 OR p.IsActive = 1);

    SELECT
        v.VariantId,
        v.ProductId,
        v.SKU,
        v.Price,
        v.StockQuantity,
        v.IsDefault,
        v.IsActive
    FROM ProductVariants v
    WHERE v.ProductId = @ProductId
    ORDER BY v.IsDefault ASC, v.VariantId ASC;

    SELECT
        vav.VariantId,
        @ProductId AS ProductId,
        pa.Name AS AttributeName,
        pav.Value AS AttributeValue
    FROM VariantAttributeValues vav
    INNER JOIN ProductAttributeValues pav ON vav.AttributeValueId = pav.AttributeValueId
    INNER JOIN ProductAttributes pa ON pav.AttributeId = pa.AttributeId
    WHERE vav.VariantId IN (SELECT VariantId FROM ProductVariants WHERE ProductId = @ProductId)

    UNION ALL

    SELECT
        NULL AS VariantId,
        par.ProductId,
        pa.Name AS AttributeName,
        NULL AS AttributeValue
    FROM ProductAttributeRequirements par
    INNER JOIN ProductAttributes pa ON par.AttributeId = pa.AttributeId
    WHERE par.ProductId = @ProductId;

    SELECT
        pi.ProductImageId,
        pi.ProductId,
        pi.ImageUrl,
        pi.IsPrimary,
        pi.SortOrder
    FROM ProductImages pi
    WHERE pi.ProductId = @ProductId
    ORDER BY pi.IsPrimary ASC, pi.SortOrder ASC;
END
GO

PRINT 'Stored Procedure spProducts_GetBySlugOrId created or altered successfully.';

