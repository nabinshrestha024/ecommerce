USE [EcommerceDB];
GO
CREATE OR ALTER PROCEDURE spWishlist_Add
    @UserId INT,
    @ProductId INT
AS
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM Wishlists 
        WHERE UserId = @UserId AND ProductId = @ProductId
    )
    BEGIN
        INSERT INTO Wishlists (UserId, ProductId)
        VALUES (@UserId, @ProductId)
    END
END
GO
