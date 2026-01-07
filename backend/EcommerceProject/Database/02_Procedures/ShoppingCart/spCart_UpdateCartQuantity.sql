USE [EcommerceDB]
GO
/****** Object:  StoredProcedure [dbo].[spCart_UpdateCartQuantity]    Script Date: 1/6/2026 10:27:18 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER   PROCEDURE [dbo].[spCart_UpdateCartQuantity]
    @CartId INT,
    @Quantity INT
AS
BEGIN

    SET NOCOUNT ON;
    DECLARE @VariantId INT;
    DECLARE @Stock INT;


    SELECT @VariantId = VariantId
    FROM ShoppingCarts
    WHERE CartId = @CartId;


    if @VariantId IS NULL
    BEGIN 
        RAISERROR('Cart item not found ',16,1);
        RETURN;
    
    
    END

    SELECT @Stock = StockQuantity
    FROM ProductVariants
    WHERE VariantId = @VariantId;

    IF @Stock IS NULL
    BEGIN 
        RAISERROR('product  variant not found',16,1);
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
