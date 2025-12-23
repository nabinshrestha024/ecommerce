USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spPayment_MarkFailed
    @PaymentId          INT,
    @Reason             VARCHAR(500)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Payments
    SET
        Status = 'Failed',
        Metadata = @Reason,
        UpdatedAt = GETUTCDATE()
    WHERE PaymentId = @PaymentId;
END
GO

PRINT 'Procedure spPayment_MarkFailed created successfully.';
GO