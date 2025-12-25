CREATE OR ALTER PROCEDURE spWishlist_MoveToCart
    @UserId INT,
    @ProductId INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Stock INT;

    SELECT @Stock = StockQuantity
    FROM Products
    WHERE ProductId = @ProductId AND IsActive = 1;

    IF @Stock IS NULL OR @Stock <= 0
    BEGIN
        THROW 50002, 'Product out of stock', 1;
    END

    IF EXISTS (
        SELECT 1 FROM ShoppingCarts 
        WHERE UserId = @UserId AND ProductId = @ProductId
    )
    BEGIN
        UPDATE ShoppingCarts
        SET Quantity = Quantity + 1
        WHERE UserId = @UserId AND ProductId = @ProductId;
    END
    ELSE
    BEGIN
        INSERT INTO ShoppingCarts (UserId, ProductId, Quantity, AddedDate)
        VALUES (@UserId, @ProductId, 1, GETDATE());
    END

    DELETE FROM Wishlists
    WHERE UserId = @UserId AND ProductId = @ProductId;
END
GO
