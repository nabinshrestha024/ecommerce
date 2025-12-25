USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spEsewa_GetPaymentForVerification
    @TransactionUUID VARCHAR(200)
AS
BEGIN
    SELECT
        p.PaymentId,
        p.OrderId,
        p.Amount
    FROM Payments p
    WHERE p.TransactionId = @TransactionUUID;
END
GO

PRINT 'Stored Procedure ''spEsewa_GetPaymentForVerification'' created or altered successfully.';
GO