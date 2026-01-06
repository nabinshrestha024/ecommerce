USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spOrders_CreateFromCart
    @UserId INT,
    @ShippingName VARCHAR(100) = NULL,
    @ShippingAddress VARCHAR(300) = NULL,
    @ShippingCity VARCHAR(50) = NULL,
    @ShippingPhone VARCHAR(20) = NULL,
    @PaymentMethodId INT,
    @PaymentGateway VARCHAR(50) = NULL,
    @Notes VARCHAR(500) = NULL,
    @OrderId INT OUTPUT,
    @TotalAmount DECIMAL(18,2) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    IF @UserId IS NULL
    BEGIN
        RAISERROR('User not found.', 16, 1);
        RETURN;
    END

    IF NOT EXISTS (SELECT 1 FROM ShoppingCarts WHERE UserId = @UserId)
    BEGIN
        RAISERROR('Cart not found for this user.', 16, 1);
        RETURN;
    END

    BEGIN TRY
        BEGIN TRAN;

        SELECT @TotalAmount = SUM(sc.Quantity * pv.Price)
        FROM ShoppingCarts sc
        INNER JOIN ProductVariants pv ON sc.VariantId = pv.VariantId
        WHERE sc.UserId = @UserId;

        INSERT INTO Orders
        (
            UserId, TotalAmount, Status,
            ShippingName, ShippingAddress, ShippingCity, ShippingPhone,
            PaymentMethodId, PaymentStatus, PaymentGateway, Notes,
            CreatedAt, UpdatedAt
        )
        VALUES
        (
            @UserId, @TotalAmount, 'Pending',
            @ShippingName, @ShippingAddress, @ShippingCity, @ShippingPhone,
            @PaymentMethodId, 'Pending', @PaymentGateway, @Notes,
            GETDATE(), GETDATE()
        );

        SET @OrderId = SCOPE_IDENTITY();


        INSERT INTO OrderItems (OrderId, ProductId,VariantId, Quantity, UnitPrice)
        SELECT
            @OrderId,
            pv.ProductId,
            sc.VariantId,
            sc.Quantity,
            pv.Price
        FROM ShoppingCarts sc
        INNER JOIN ProductVariants pv ON sc.VariantId = pv.VariantId
        WHERE sc.UserId = @UserId;

        UPDATE pv
        SET StockQuantity = StockQuantity - sc.Quantity
        FROM ProductVariants pv
        INNER JOIN ShoppingCarts sc ON pv.VariantId = sc.VariantId
        WHERE sc.UserId = @UserId;

        DELETE FROM ShoppingCarts WHERE UserId = @UserId;

        COMMIT;

        SELECT 
            VariantId,
            Quantity,
            UnitPrice
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
