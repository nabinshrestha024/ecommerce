USE [EcommerceDB]
GO

CREATE OR ALTER PROCEDURE spWishlist_Add
    @UserId INT,
    @VariantId INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Check product exists & active
    IF NOT EXISTS (
        SELECT 1 
        FROM ProductVariants 
        WHERE VariantId = @VariantId AND IsActive = 1
    )
    BEGIN
        THROW 50001, 'Product not found or inactive', 1;
    END

    -- Prevent duplicate wishlist
    IF NOT EXISTS (
        SELECT 1 
        FROM Wishlists 
        WHERE UserId = @UserId AND VariantId = @VariantId
    )
    BEGIN
    INSERT INTO Wishlists (UserId, VariantId, AddedDate)
    VALUES (@UserId, @VariantId, GETDATE());
    END
END
