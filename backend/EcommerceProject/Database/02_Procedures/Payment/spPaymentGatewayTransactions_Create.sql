USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spPaymentGatewayTransactions_Create
    @PaymentId INT,
    @TransactionId      VARCHAR(100),
    @ReferenceId        VARCHAR(100),
    @Amount             DECIMAL(18,2),
    @Status             VARCHAR(50),
    @RawResponse        VARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO PaymentGatewayTransactions
    (
        PaymentId,
        TransactionId,
        ReferenceId,
        Amount,
        Status,
        RawResponse,
        CreatedAt
    )
    VALUES
    (
        @PaymentId,
        @TransactionId,
        @ReferenceId,
        @Amount,
        @Status,
        @RawResponse,
        GETUTCDATE()
    );
END
GO

PRINT 'Procedure spPaymentGatewayTransactions_Create created successfully.';
GO
