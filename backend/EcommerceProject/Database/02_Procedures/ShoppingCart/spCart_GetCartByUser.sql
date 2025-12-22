CREATE PROCEDURE spCart_GetCartByUser
    @UserId INT
AS
BEGIN
    SELECT 
        sc.CartId,
        sc.UserId,
        sc.ProductId,
        p.Name,
        p.Price,
        sc.Quantity,
        sc.AddedDate
    FROM ShoppingCarts sc
    JOIN Products p ON sc.ProductId = p.ProductId
    WHERE sc.UserId = @UserId
END 