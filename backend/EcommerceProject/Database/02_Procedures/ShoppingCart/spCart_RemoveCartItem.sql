CREATE PROCEDURE spCart_RemoveCartItem
    @CartId INT
AS
BEGIN
    DELETE FROM ShoppingCarts WHERE CartId = @CartId
END