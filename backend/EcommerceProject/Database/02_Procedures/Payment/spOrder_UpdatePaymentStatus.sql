USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spOrder_UpdatePaymentStatus
    @OrderId INT,
    @PaymentStatus  VARCHAR(50),
    @OrderStatus    VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Orders
    SET
        PaymentStatus = @PaymentStatus,
        OrderStatus = @OrderStatus,
        UpdatedAt = GETUTCDATE()
    WHERE OrderId = @OrderId;
END
GO

PRINT 'Procedure spOrder_UpdatePaymentStatus created successfully.';
GO
