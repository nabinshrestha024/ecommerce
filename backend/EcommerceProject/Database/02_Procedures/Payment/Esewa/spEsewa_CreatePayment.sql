USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spEsewa_CreatePayment
    @OrderId INT,
    @Amount DECIMAL(10,2),
    @TransactionUUID VARCHAR(200)    
AS
BEGIN
    SET NOCOUNT ON;
    --BEGIN TRAN;

    INSERT INTO Payments
    (
        OrderId,
        Amount,
        PaymentMethod,
        PaymentGateway,
        PaymentStatus,
        TransactionId,
        CreatedAt
    )
    VALUES
    (
        @OrderId, 
        @Amount, 
        'esewa',
        'eSewa',
        'Pending',
        @TransactionUUID,
        SYSUTCDATETIME()
    );

    SELECT SCOPE_IDENTITY() AS PaymentId;

END
GO

PRINT 'Stored Procedure ''spEsewa_CreatePayment'' created or altered successfully.';
GO
