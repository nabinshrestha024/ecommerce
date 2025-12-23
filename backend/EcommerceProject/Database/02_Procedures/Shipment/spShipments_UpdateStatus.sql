USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spShipments_UpdateStatus
    @ShipmentId INT,
    @Status VARCHAR(30)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Shipments
    SET
        Status = @Status,
        UpdatedAt = SYSUTCDATETIME(),
        ShippedAt =
            CASE WHEN @Status = 'Shipped' THEN SYSUTCDATETIME() ELSE ShippedAt END,
        DeliveredAt =
            CASE WHEN @Status = 'Delivered' THEN SYSUTCDATETIME() ELSE DeliveredAt END
    WHERE ShipmentId = @ShipmentId;

    IF @@ROWCOUNT = 0
        RAISERROR('Shipment not found.', 16, 1);
END
GO
