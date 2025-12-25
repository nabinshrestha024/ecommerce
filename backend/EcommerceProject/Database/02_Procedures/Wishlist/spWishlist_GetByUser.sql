USE [EcommerceDB]
GO
CREATE OR ALTER PROCEDURE [dbo].[spWishlist_GetByUser]
    @UserId INT
AS
BEGIN
    SELECT 
        w.WishlistId,
        w.UserId,
        w.ProductId,
        p.Name,
        w.AddedDate,
        p.Name,
        p.Price As ProductPrice
    FROM Wishlists w
    INNER JOIN Products p ON w.ProductId = p.ProductId
    WHERE w.UserId = @UserId
END
