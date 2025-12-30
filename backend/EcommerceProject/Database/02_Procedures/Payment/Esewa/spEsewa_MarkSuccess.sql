USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spEsewa_MarkSuccess
    @PaymentId          INT,
    @GatewayReference   VARCHAR(200),
    @RawResponse        VARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRAN;

        DECLARE @OrderId INT, 
                @Amount DECIMAL(10,2), 
                @OriginalTxnId VARCHAR(100); 
        SELECT
            @OrderId = OrderId,
            @Amount = Amount,
            @OriginalTxnId = TransactionId 
        FROM Payments
        WHERE PaymentId = @PaymentId;

        UPDATE Payments
        SET PaymentStatus = 'Success',
            Status = 'Success',
            GatewayReference = @GatewayReference,
            UpdatedAt = SYSUTCDATETIME()
        WHERE PaymentId = @PaymentId;

        INSERT INTO PaymentGatewayTransactions
        (
            GatewayName,
            GatewayTransactionId, 
            PaymentId,
            TransactionId,       
            Amount,
            Status,
            RawResponse,
            CreatedAt
        )
        VALUES
        (
            'eSewa',
            @GatewayReference,
            @PaymentId,
            @OriginalTxnId,      
            @Amount,
            'Success',
            @RawResponse,
            SYSUTCDATETIME()
        );

        UPDATE Orders
        SET PaymentStatus = 'Paid',
            UpdatedAt = SYSUTCDATETIME()
        WHERE OrderId = @OrderId;

        INSERT INTO Transactions (OrderId, PaymentId, Type, Amount, Status, Reference)
        VALUES (@OrderId, @PaymentId, 'Debit', @Amount, 'Success', @GatewayReference);

        INSERT INTO Shipments (OrderId)
        VALUES (@OrderId);

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK;
        THROW;
    END CATCH;
END

PRINT 'Stored Procedure ''spEsewa_MarkSuccess'' created or altered successfully.';
GO