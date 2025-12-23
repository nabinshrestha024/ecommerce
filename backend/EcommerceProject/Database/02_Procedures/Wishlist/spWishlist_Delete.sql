USE [EcommerceDB];
GO
CREATE OR ALTER PROCEDURE spWishlist_Delete
    @WishlistId INT
AS
BEGIN
    DELETE FROM Wishlists WHERE WishlistId = @WishlistId
END
GO
