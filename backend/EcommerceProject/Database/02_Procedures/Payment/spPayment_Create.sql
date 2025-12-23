USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spPayment_Create
    @OrderId        INT,
    @Amount         DECIMAL(18,2),
    @TransactionId  VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Payments
    (
        OrderId,
        Amount,
        Status,
        PaymentMethod,
        PaymentGateway,
        TransactionId,
        CreatedAt
    )
    VALUES
    (
        @OrderId,
        @Amount,
        'Pending',
        'eSewa',
        'eSewa',
        @TransactionId,
        GETUTCDATE()
    );

    SELECT CAST(SCOPE_IDENTITY() AS INT) AS PaymentId;
END
GO

PRINT 'Procedure spPayment_Create created successfully.';
GO
