USE [EcommerceDB]
GO

CREATE OR ALTER   PROCEDURE spCart_AddToCart
    @UserId INT,
    @VariantId INT,
    @Quantity INT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Stock INT;

     SELECT @Stock = StockQuantity
    FROM ProductVariants
    WHERE VariantId = @VariantId
      AND IsActive = 1;

      IF @Stock IS NULL
        THROW 50001, 'Variant not found or inactive', 1;

        IF @Quantity > @Stock
        THROW 50002, 'Insufficient stock', 1;

    IF EXISTS (
        SELECT 1 FROM ShoppingCarts 
        WHERE UserId = @UserId AND VariantId = @VariantId
    )
    BEGIN
        UPDATE ShoppingCarts
        SET Quantity = Quantity + @Quantity
        WHERE UserId = @UserId AND VariantId = @VariantId
    END
    ELSE
    BEGIN
        INSERT INTO ShoppingCarts (UserId, VariantId, Quantity)
        VALUES (@UserId, @VariantId, @Quantity)
    END
END