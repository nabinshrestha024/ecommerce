USE [EcommerceDB]
GO

CREATE OR ALTER   PROCEDURE spCart_GetCartByUser
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
        sc.AddedDate        AS AddedDate
    FROM ShoppingCarts sc
    INNER JOIN ProductVariants pv ON sc.VariantId = pv.VariantId
    INNER JOIN Products p ON pv.ProductId = p.ProductId
    LEFT JOIN ProductImages pp
    ON pp.ProductId = p.ProductId AND pp.IsPrimary = 1
        WHERE sc.UserId = @UserId;
END
