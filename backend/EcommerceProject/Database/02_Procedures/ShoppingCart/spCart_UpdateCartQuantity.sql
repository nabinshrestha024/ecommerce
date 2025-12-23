USE [EcommerceDB];
GO
CREATE OR ALTER PROCEDURE spCart_UpdateCartQuantity
    @CartId INT,
    @Quantity INT
AS
BEGIN
    UPDATE ShoppingCarts
    SET Quantity = @Quantity
    WHERE CartId = @CartId
END