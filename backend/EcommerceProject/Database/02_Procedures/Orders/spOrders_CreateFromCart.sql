USE [EcommerceDB]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER   PROCEDURE [dbo].[spOrders_CreateFromCart]
    @UserId INT,
    @ShippingName VARCHAR(100) = NULL,
    @ShippingAddress VARCHAR(300),
    @ShippingCity VARCHAR(50),
    @ShippingPhone VARCHAR(20),
    @PaymentMethodId INT,
    @PaymentGateway VARCHAR(50) = NULL,
    @Notes VARCHAR(500) = NULL,
    @OrderId INT OUTPUT,
    @TotalAmount DECIMAL(10,2) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @CartId INT;

    IF @UserId IS NULL
    BEGIN
        RAISERROR('User not found .', 16, 1);
        RETURN;
    END

    SELECT TOP 1 @CartId = c.CartId
    FROM ShoppingCarts c
    WHERE c.UserId = @UserId;

    IF @CartId IS NULL
    BEGIN
        RAISERROR('Cart not found for this user.', 16, 1);
        RETURN;
    END

    BEGIN TRY
        BEGIN TRAN;

        Select
         @TotalAmount =
            CAST(SUM(ci.Quantity * p.Price) AS DECIMAL(10,2))
        -- *  
        FROM ShoppingCarts ci
        INNER JOIN Products p ON p.ProductId = ci.ProductId
        where ci.UserId = @UserId

        INSERT INTO Orders
        (
            UserId, TotalAmount, Status,
            ShippingName, ShippingAddress, ShippingCity, ShippingPhone,
            PaymentMethodId, PaymentStatus, PaymentGateway, Notes
        )
        VALUES
        (
            @UserId, @TotalAmount, 'Pending',
            @ShippingName, @ShippingAddress, @ShippingCity, @ShippingPhone,
            @PaymentMethodId, 'Pending', @PaymentGateway, @Notes
        );

        SET @OrderId = SCOPE_IDENTITY();

        INSERT INTO OrderItems (OrderId, ProductId, Quantity, UnitPrice)
        SELECT
            @OrderId,
            ci.ProductId,
            ci.Quantity,
            p.Price
        FROM ShoppingCarts ci
        INNER JOIN Products p ON p.ProductId = ci.ProductId
        where ci.UserId = @UserId;

        DELETE FROM ShoppingCarts WHERE UserId = @UserId;
        
        COMMIT;

               SELECT 
            ProductId,
            Quantity
        FROM OrderItems
        WHERE OrderId = @OrderId;

    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK;
        DECLARE @Msg NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@Msg, 16, 1);
        RETURN;
    END CATCH
END
