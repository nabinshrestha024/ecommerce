USE [EcommerceDB]
GO


CREATE OR ALTER   PROCEDURE [dbo].[spCart_GetCartByUser]
    @UserId INT
AS
BEGIN
    
    SET NOCOUNT ON;

    SELECT 
        sc.CartId           AS CartId,
        sc.ProductId        AS ProductId,
        p.Name              AS ProductName,
        pp.ImageUrl         AS ProductImageUrl,
        p.Description       AS Description,
        p.Price             AS Price,
        sc.Quantity         AS Quantity,
        (p.Price * sc.Quantity) AS TotalPrice,
        sc.AddedDate        AS AddedDate
    FROM ShoppingCarts sc
    INNER JOIN Products p ON sc.ProductId = p.ProductId
    LEFT JOIN ProductImages pp
    ON pp.ProductId = p.ProductId AND pp.IsPrimary = 1
        WHERE sc.UserId = @UserId
END
