CREATE OR ALTER PROCEDURE spStock_Decrease_OnOrder
    @ProductId INT,
    @Quantity INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Products
    SET StockQuantity = StockQuantity - @Quantity,
        UpdatedAt = GETDATE()
    WHERE ProductId = @ProductId
      AND StockQuantity >= @Quantity;

    IF @@ROWCOUNT = 0
        THROW 50002, 'Insufficient stock', 1;
END
