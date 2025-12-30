USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spEsewa_GetPaymentForVerification
    @TransactionUUID VARCHAR(200)
AS
BEGIN
    SELECT
        PaymentId,
        OrderId,
        Amount,
        PaymentStatus
    FROM Payments
    WHERE TransactionId = @TransactionUUID;
END
GO

PRINT 'Stored Procedure ''spEsewa_GetPaymentForVerification'' created or altered successfully.';
GO