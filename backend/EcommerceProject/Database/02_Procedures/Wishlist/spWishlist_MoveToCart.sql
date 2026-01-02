USE [EcommerceDB]
GO


CREATE OR ALTER   PROCEDURE [dbo].[spWishlist_MoveToCart]
    @WishlistId INT,
    @UserId INT,
    @Quantity INT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @VariantId INT;
    DECLARE @Stock INT;

    BEGIN TRAN;

    SELECT @VariantId = VariantId
    FROM Wishlists
    WHERE WishlistId = @WishlistId AND UserId = @UserId;

    IF @VariantId IS NULL 
    BEGIN 
        ROLLBACK;

        THROW 50001,'Wishlist item not found',1;
        END

    SELECT @Stock = StockQuantity
    FROM ProductVariants
    WHERE VariantId = @VariantId AND IsActive = 1;

     IF @Stock < @Quantity
    BEGIN
        ROLLBACK;
        THROW 50002, 'Insufficient stock', 1;
    END

    IF EXISTS (
        SELECT 1 FROM ShoppingCarts 
        WHERE UserId = @UserId AND VariantId = @VariantId
    )
    BEGIN
        UPDATE ShoppingCarts
        SET Quantity = Quantity + @Quantity
        WHERE UserId = @UserId AND VariantId = @VariantId;
    END
    ELSE
    BEGIN
        INSERT INTO ShoppingCarts (UserId, VariantId, Quantity, AddedDate)
        VALUES (@UserId, @VariantId, @Quantity, GETDATE());
    END

    DELETE FROM Wishlists
    WHERE WishlistId = @WishlistId AND UserId = @UserId;

    COMMIT;
END
