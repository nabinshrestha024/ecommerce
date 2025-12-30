USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spEsewa_MarkFailed
    @PaymentId      INT,
    @RawResponse    VARCHAR(MAX)
AS
BEGIN
    UPDATE Payments
    SET PaymentStatus = 'Failed',
        Status = 'Failed',
        UpdatedAt = SYSUTCDATETIME()
    WHERE PaymentId = @PaymentId;


    INSERT INTO PaymentGatewayTransactions
    (
        GatewayName,
        PaymentId,
        Status,
        RawResponse,
        CreatedAt
    )

    VALUES
    (
        'eSewa',
        @PaymentId,
        'Failed',
        @RawResponse,
        SYSUTCDATETIME()
    );
END
GO

PRINT 'Stored Procedure ''spEsewa_MarkFailed'' created or altered successfully.';
GO