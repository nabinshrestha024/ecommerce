USE [EcommerceDB]
GO


CREATE OR ALTER PROCEDURE [dbo].[spWishlist_Delete]
    @WishlistId INT 

    
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Wishlists
    WHERE WishlistId = @WishlistId;
END
