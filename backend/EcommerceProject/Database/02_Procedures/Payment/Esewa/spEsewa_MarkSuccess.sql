USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spEsewa_MarkSuccess
    @PaymentId INT,
    @GatewayReference VARCHAR(200),
    @RawResponse VARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRAN;

        UPDATE Payments
        SET PaymentStatus = 'Success',
            Status = 'Success',
            GatewayReference = @GatewayReference,
            UpdatedAt = SYSUTCDATETIME()
        WHERE PaymentId = @PaymentId;

        UPDATE PaymentGatewayTransactions
        SET Status = 'Success',
            GatewayTransactionId = @GatewayReference,
            RawResponse = @RawResponse,
            UpdatedAt = SYSUTCDATETIME()
        WHERE PaymentId = @PaymentId;

        DECLARE @OrderId INT, @Amount DECIMAL(10,2);

        SELECT @OrderId = OrderId, @Amount = Amount
        FROM Payments WHERE PaymentId = @PaymentId;

        UPDATE Orders
        SET PaymentStatus = 'Paid',
            Status = 'Paid',
            UpdatedAt = SYSUTCDATETIME()
        WHERE OrderId = @OrderId;

        INSERT INTO Transactions
        (OrderId, PaymentId, Type, Amount, Status, Reference)
        VALUES
        (@OrderId, @PaymentId, 'Debit', @Amount, 'Success', @GatewayReference);  

        INSERT INTO Shipments (OrderId)
        VALUES (@OrderId);

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK;
        THROW;
    END CATCH
END;
GO

PRINT 'Stored Procedure ''spEsewa_MarkSuccess'' created or altered successfully.';
GO