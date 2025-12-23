USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spPayment_MarkSuccess
    @PaymentId          INT,
    @GatewayReference   VARCHAR(100),
    @Metadata           VARCHAR(MAX)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Payments
    SET
        Status = 'Success',
        GatewayReference = @GatewayReference,
        Metadata = @Metadata,
        UpdatedAt = GETUTCDATE()
    WHERE PaymentId = @PaymentId;
END
GO

PRINT 'Procedure spPayment_MarkSuccess created successfully.';
GO
