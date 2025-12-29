USE [EcommerceDB]
GO

CREATE OR ALTER   PROCEDURE spCart_UpdateCartQuantity
    @CartId INT,
    @Quantity INT
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @ProductId INT;
    DECLARE @Stock INT;


    SELECT @ProductId = ProductId
    FROM ShoppingCarts
    WHERE CartId = @CartId;


    if @ProductId IS NULL
    BEGIN 
        RAISERROR('Cart item not found ',16,1);
        RETURN;
    
    
    END

    SELECT @Stock = StockQuantity
    FROM Products
    WHERE productId = @ProductId;

    IF @Stock IS NULL
    BEGIN 
        RAISERROR('product not found',16,1);
        RETURN;
    END


    IF @Quantity > @Stock
    BEGIN 
        RAISERROR('only%d item(s) available in stock',16,1, @Stock);
        RETURN;
    END

    UPDATE ShoppingCarts
    SET Quantity = @Quantity
    WHERE CartId = @CartId
END
