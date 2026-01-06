USE [EcommerceDB]
GO

CREATE OR ALTER PROCEDURE [dbo].[spCart_GetCartByUser]
    @UserId INT
AS
BEGIN
    
    SET NOCOUNT ON;

    SELECT 
        sc.UserId           AS UserId,
        sc.CartId           AS CartId,
        p.ProductId        AS ProductId,
        sc.VariantId        AS VariantId,
        p.Name              AS ProductName,
        p.Slug              AS Slug,
        pv.SKU              AS SKU,
        pp.ImageUrl         AS ProductImageUrl,
        p.Description       AS Description,
        pv.Price             AS Price,
        sc.Quantity         AS Quantity,
        (pv.Price * sc.Quantity) AS TotalPrice,
        sc.AddedDate        AS AddedDate,
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
    LEFT JOIN ProductVariants pv ON sc.VariantId = pv.VariantId
    INNER JOIN Products p ON pv.ProductId = p.ProductId
    LEFT JOIN ProductImages pp
    ON pp.ProductId = p.ProductId AND pp.IsPrimary = 1
        WHERE sc.UserId = @UserId;
END
