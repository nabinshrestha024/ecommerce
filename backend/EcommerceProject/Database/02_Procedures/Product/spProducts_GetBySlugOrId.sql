USE [EcommerceDB]
GO
 
ALTER PROCEDURE [dbo].[spProducts_GetBySlugOrId]
(
    @SlugOrId VARCHAR(200),
    @OnlyActive BIT = 1,
    @IncludeInactiveVariants BIT = 0   
)
AS
BEGIN
    SET NOCOUNT ON;
 
    DECLARE @ProductId INT = TRY_CONVERT(INT, @SlugOrId);
 
    IF @ProductId IS NULL
    BEGIN
        SELECT @ProductId = ProductId
        FROM Products
        WHERE Slug = @SlugOrId;
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
 
        COALESCE(v.Price,
            (SELECT TOP 1 Price
             FROM ProductVariants
             WHERE ProductId = p.ProductId
               AND (@IncludeInactiveVariants = 1 OR IsActive = 1)
             ORDER BY IsDefault DESC, Price ASC)
        ) AS Price,
 
        COALESCE(v.StockQuantity,
            (SELECT TOP 1 StockQuantity
             FROM ProductVariants
             WHERE ProductId = p.ProductId
               AND (@IncludeInactiveVariants = 1 OR IsActive = 1)
             ORDER BY IsDefault DESC, Price ASC)
        ) AS StockQuantity,
 
        v.DiscountId,
        d.DiscountType,
        d.DiscountValue,
        CASE
            WHEN v.DiscountId IS NULL THEN 0
            WHEN d.DiscountType = 'Percentage'
                THEN v.Price - (v.Price * d.DiscountValue / 100)
            WHEN d.DiscountType = 'Flat'
                THEN v.Price - d.DiscountValue
            ELSE 0
        END AS FinalPrice
 
    FROM Products p
    INNER JOIN Categories c ON p.CategoryId = c.CategoryId
    LEFT JOIN ProductVariants v
        ON v.ProductId = p.ProductId
       AND v.IsDefault = 1
       AND (@IncludeInactiveVariants = 1 OR v.IsActive = 1)
    LEFT JOIN Discounts d
        ON d.DiscountId = v.DiscountId
       AND d.IsActive = 1
       AND (d.StartDate IS NULL OR d.StartDate <= GETDATE())
       AND (d.EndDate IS NULL OR d.EndDate >= GETDATE())
    WHERE p.ProductId = @ProductId
      AND (@OnlyActive = 0 OR p.IsActive = 1);
 
    SELECT
        v.VariantId,
        v.ProductId,
        v.SKU,
        v.Price,
        v.StockQuantity,
        v.DiscountId,
        d.DiscountType,
        d.DiscountValue,
 
        CASE
            WHEN v.DiscountId IS NULL THEN 0
            WHEN d.DiscountType = 'Percentage'
                THEN v.Price - (v.Price * d.DiscountValue / 100)
            WHEN d.DiscountType = 'Flat'
                THEN v.Price - d.DiscountValue
            ELSE 0
        END AS FinalPrice,
 
        v.IsDefault,
        v.IsActive
    FROM ProductVariants v
    LEFT JOIN Discounts d
        ON d.DiscountId = v.DiscountId
       AND d.IsActive = 1
       AND (d.StartDate IS NULL OR d.StartDate <= GETDATE())
       AND (d.EndDate IS NULL OR d.EndDate >= GETDATE())
    WHERE v.ProductId = @ProductId
      AND (@IncludeInactiveVariants = 1 OR v.IsActive = 1)
    ORDER BY v.IsDefault DESC, v.VariantId ASC;
 
    /* ================= ATTRIBUTES ================= */
    SELECT
        vav.VariantId,
        pv.ProductId,
        pa.Name AS AttributeName,
        pav.Value AS AttributeValue
    FROM VariantAttributeValues vav
    INNER JOIN ProductAttributeValues pav
        ON vav.AttributeValueId = pav.AttributeValueId
    INNER JOIN ProductVariants pv
        ON vav.VariantId = pv.VariantId
    INNER JOIN ProductAttributes pa
        ON pav.AttributeId = pa.AttributeId
    WHERE vav.VariantId IN (
        SELECT VariantId
        FROM ProductVariants
        WHERE ProductId = @ProductId
          AND (@IncludeInactiveVariants = 1 OR IsActive = 1)
    )
 
    UNION ALL
 
    SELECT
        NULL AS VariantId,
        par.ProductId,
        pa.Name AS AttributeName,
        NULL AS AttributeValue
    FROM ProductAttributeRequirements par
    INNER JOIN ProductAttributes pa
        ON par.AttributeId = pa.AttributeId
    WHERE par.ProductId = @ProductId;
 
    SELECT
        pi.ProductImageId,
        pi.ProductId,
        pi.ImageUrl,
        pi.IsPrimary,
        pi.SortOrder
    FROM ProductImages pi
    WHERE pi.ProductId = @ProductId
    ORDER BY pi.IsPrimary DESC, pi.SortOrder ASC;
END
GO