CREATE PROCEDURE spCart_AddToCart
    @UserId INT,
    @ProductId INT,
    @Quantity INT
AS
BEGIN
    IF EXISTS (
        SELECT 1 FROM ShoppingCarts 
        WHERE UserId = @UserId AND ProductId = @ProductId
    )
    BEGIN
        UPDATE ShoppingCarts
        SET Quantity = Quantity + @Quantity
        WHERE UserId = @UserId AND ProductId = @ProductId
    END
    ELSE
    BEGIN
        INSERT INTO ShoppingCarts (UserId, ProductId, Quantity)
        VALUES (@UserId, @ProductId, @Quantity)
    END
END