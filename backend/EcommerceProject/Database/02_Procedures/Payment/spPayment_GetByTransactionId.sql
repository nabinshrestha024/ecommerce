USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spPayment_GetByTransactionId
    @TransactionId VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM Payments
    WHERE TransactionId = @TransactionId;
END
GO

PRINT 'Procedure spPayment_GetByTransactionId created successfully.';
GO
