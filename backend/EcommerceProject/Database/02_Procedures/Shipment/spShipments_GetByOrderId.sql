USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spShipments_GetByOrderId
    @OrderId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        ShipmentId,
        OrderId,
        Status,
        ShippedAt,
        DeliveredAt,
        ShippingCost,
        Notes,
        CreatedAt,
        UpdatedAt
    FROM Shipments
    WHERE OrderId = @OrderId;
END
GO
