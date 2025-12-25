USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spOrders_CreateFromCart
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
        RAISERROR('USer not found .', 16, 1);
        RETURN;
    END

    SELECT TOP 1 @CartId = c.CartId
    FROM CartItems c
    WHERE c.UserId = @UserId;

    IF @CartId IS NULL
    BEGIN
        RAISERROR('Cart not found for this user.', 16, 1);
        RETURN;
    END

    --IF NOT EXISTS (SELECT 1 FROM CartItems WHERE CartId = @CartId)
    --BEGIN
    --    RAISERROR('Cart is empty.', 16, 1);
    --    RETURN;
    --END

    BEGIN TRY
        BEGIN TRAN;

        --SELECT @TotalAmount =
        --    CAST(SUM(ci.Quantity * p.Price) AS DECIMAL(10,2))
        --FROM CartItems ci
        --INNER JOIN Products p ON p.ProductId = ci.ProductId
        --WHERE ci.CartId = @CartId;

        Select
         @TotalAmount =
            CAST(SUM(ci.Quantity * p.Price) AS DECIMAL(10,2))
        -- *  
        FROM CartItems ci
        INNER JOIN Products p ON p.ProductId = ci.ProductId
        where ci.UserId = @UserId

        --IF @TotalAmount IS NULL OR @TotalAmount <= 0
        --BEGIN
        --    RAISERROR('Failed to calculate total amount.', 16, 1);
        --    ROLLBACK;
        --    RETURN;
        --END

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
        FROM CartItems ci
        INNER JOIN Products p ON p.ProductId = ci.ProductId
        where ci.UserId = @UserId;

        DELETE FROM CartItems WHERE UserId = @UserId;
        
        --select @OrderId as orderId;

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK;
        DECLARE @Msg NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@Msg, 16, 1);
        RETURN;
    END CATCH
END
GO
