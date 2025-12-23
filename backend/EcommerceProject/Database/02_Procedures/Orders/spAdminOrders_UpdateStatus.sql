USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spAdminOrders_UpdateStatus
    @OrderId INT,
    @NewStatus VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    IF @NewStatus NOT IN ('Pending','Processing','Shipped','Delivered','Cancelled')
    BEGIN
        RAISERROR('Invalid status.', 16, 1);
        RETURN;
    END

    UPDATE Orders
    SET Status = @NewStatus
    WHERE OrderId = @OrderId;

    IF @@ROWCOUNT = 0
        RAISERROR('Order not found.', 16, 1);
END
GO
