CREATE OR ALTER PROCEDURE sales.Payment_Create
(
    @OrderId        BIGINT,
    @Amount         DECIMAL(18,2),
    @MethodId       INT,
    @PaymentId      BIGINT OUTPUT
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO sales.Payments (OrderId, Amount, MethodId, Status, CreatedAt)
    VALUES (@OrderId, @Amount, @MethodId, 'PENDING', SYSUTCDATETIME());

    SET @PaymentId = SCOPE_IDENTITY();
END
GO
PRINT 'Stored procedure sales.Payment_Create created successfully.';
GO