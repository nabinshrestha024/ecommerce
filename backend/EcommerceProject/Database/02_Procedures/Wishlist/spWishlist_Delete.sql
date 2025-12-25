USE [EcommerceDB]

GO
CREATE OR ALTER   PROCEDURE [dbo].[spWishlist_Delete]
    @UserId INT,
    @ProductId INT
    
AS
BEGIN
    SET NOCOUNT ON;

    DELETE FROM Wishlists
    WHERE UserId = @UserId AND ProductId = @ProductId;
END
