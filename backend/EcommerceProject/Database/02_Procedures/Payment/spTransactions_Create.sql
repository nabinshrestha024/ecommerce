USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spTransactions_Create
    @OrderId        INT,
    @PaymentId      INT,
    @Amount         DECIMAL(18,2),
    @ReferenceId    VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Transactions
    (
        OrderId,
        PaymentId,
        Type,
        Amount,
        DebitCreditFlag,
        ReferenceId,
        CreatedAt
    )
    VALUES
    (
        @OrderId,
        @PaymentId,
        'Payment',
        @Amount,
        'C',
        @ReferenceId,
        GETUTCDATE()
    );
END
GO

PRINT 'Procedure spTransactions_Create created successfully.';
GO
