USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spCart_Checkout
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalAmount DECIMAL(18,2);

    -- Calculate total
    SELECT @TotalAmount = SUM(pv.Price * sc.Quantity)
    FROM ShoppingCarts sc
    INNER JOIN ProductVariants pv ON sc.VariantId = pv.VariantId
    WHERE sc.UserId = @UserId;

    -- Insert into Orders
    INSERT INTO Orders (UserId, TotalAmount)
    VALUES (@UserId, @TotalAmount);

    DECLARE @OrderId INT = SCOPE_IDENTITY();

    -- Insert into OrderItems
    INSERT INTO OrderItems (OrderId, VariantId, Quantity, UnitPrice)
    SELECT @OrderId, sc.VariantId, sc.Quantity, pv.Price
    FROM ShoppingCarts sc
    INNER JOIN ProductVariants pv ON sc.VariantId = pv.VariantId
    WHERE sc.UserId = @UserId;

    -- Optional: Reduce stock
    UPDATE pv
    SET StockQuantity = StockQuantity - sc.Quantity
    FROM ProductVariants pv
    INNER JOIN ShoppingCarts sc ON pv.VariantId = sc.VariantId
    WHERE sc.UserId = @UserId;

    -- Clear cart
    DELETE FROM ShoppingCarts WHERE UserId = @UserId;

    SELECT @OrderId AS OrderId;
END
