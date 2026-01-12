USE [EcommerceDB]
GO

CREATE OR ALTER PROCEDURE [dbo].[spCart_GetCartByUser]
(
    @UserId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        sc.CartId,
        sc.UserId,
        sc.VariantId,
        v.ProductId,
        p.Name AS ProductName,
        v.SKU,
        pp.ImageUrl AS ProductImageUrl,
        p.Description,

        v.Price,
        sc.Quantity,

        v.Price * sc.Quantity  AS TotalPrice,
        sc.AddedDate,
        -- Discount (Variant > Product)
        COALESCE(vd.DiscountId, pd.DiscountId) AS DiscountId,
        COALESCE(vd.DiscountName, pd.DiscountName) AS DiscountName,
        COALESCE(vd.DiscountType, pd.DiscountType) AS DiscountType,
        COALESCE(vd.DiscountValue, pd.DiscountValue) AS DiscountValue,

        CASE
            WHEN COALESCE(vd.DiscountType, pd.DiscountType) = 'Percentage'
                THEN (v.Price * COALESCE(vd.DiscountValue, pd.DiscountValue)) / 100
            WHEN COALESCE(vd.DiscountType, pd.DiscountType) = 'Flat'
                THEN COALESCE(vd.DiscountValue, pd.DiscountValue)
            ELSE 0
        END AS DiscountAmount,

        CASE
            WHEN COALESCE(vd.DiscountType, pd.DiscountType) = 'Percentage'
                THEN v.Price - (v.Price * COALESCE(vd.DiscountValue, pd.DiscountValue) / 100)
            WHEN COALESCE(vd.DiscountType, pd.DiscountType) = 'Flat'
                THEN v.Price - COALESCE(vd.DiscountValue, pd.DiscountValue)
            ELSE v.Price
        END AS FinalPrice,
        (
        SELECT
        pa.Name As [Name],
        pav.Value AS [Value]
        From VariantAttributeValues vav
        INNER JOIN ProductAttributeValues pav
        ON vav.AttributeValueId = pav.AttributeValueId
        INNER JOIN ProductAttributes pa ON pav.AttributeId = pa.AttributeId


        WHERE vav.VariantId =sc.VariantId
        FOR JSON PATH
        ) AS Attributes

        

    FROM ShoppingCarts sc
    INNER JOIN ProductVariants v ON v.VariantId = sc.VariantId
    INNER JOIN Products p ON p.ProductId = v.ProductId

    OUTER APPLY (
    SELECT TOP 1 ImageUrl
    FROM ProductImages
    WHERE ProductId = p.ProductId
    ORDER BY IsPrimary DESC, ProductImageId ASC)pp

    OUTER APPLY (
        SELECT TOP 1 d.*
        FROM dbo.Discounts d
        INNER JOIN DiscountVariants dv ON dv.DiscountId = d.DiscountId
        WHERE dv.VariantId = sc.VariantId
          AND d.IsActive = 1
          AND GETDATE() BETWEEN d.StartDate AND d.EndDate
        ORDER BY d.DiscountId DESC
    ) vd

    OUTER APPLY (
        SELECT TOP 1 d.*
        FROM dbo.Discounts d
        INNER JOIN dbo.DiscountProducts dp ON dp.DiscountId = d.DiscountId
        WHERE dp.ProductId = v.ProductId
          AND d.IsActive = 1
          AND GETDATE() BETWEEN d.StartDate AND d.EndDate
        ORDER BY d.DiscountId DESC
    ) pd

    WHERE sc.UserId = @UserId;
END
