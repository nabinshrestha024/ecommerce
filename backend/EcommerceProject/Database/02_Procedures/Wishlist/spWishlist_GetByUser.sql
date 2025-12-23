CREATE OR ALTER PROCEDURE spWishlist_GetByUser
    @UserId INT
AS
BEGIN
    SELECT 
        w.WishlistId,
        w.ProductId,
        w.AddedDate,
        p.Name,
        p.Price
    FROM Wishlists w
    INNER JOIN Products p ON w.ProductId = p.ProductId
    WHERE w.UserId = @UserId
END
GO
