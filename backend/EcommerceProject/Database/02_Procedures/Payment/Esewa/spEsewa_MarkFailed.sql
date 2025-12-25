USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spEsewa_MarkFailed
    @PaymentId INT,
    @RawResponse VARCHAR(MAX)
AS
BEGIN
    UPDATE Payments
    SET PaymentStatus = 'Failed',
        Status = 'Failed',
        UpdatedAt = SYSUTCDATETIME()
    WHERE PaymentId = @PaymentId;

    UPDATE PaymentGatewayTransactions
    SET Status = 'Failed',
        RawResponse = @RawResponse,
        UpdatedAt = SYSUTCDATETIME()
    WHERE PaymentId = @PaymentId;
END
GO

PRINT 'Stored Procedure ''spEsewa_MarkFailed'' created or altered successfully.';
GO