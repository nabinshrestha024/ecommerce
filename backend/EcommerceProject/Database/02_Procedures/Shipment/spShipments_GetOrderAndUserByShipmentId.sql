USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spShipments_GetOrderAndUserByShipmentId
    @ShipmentId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        o.OrderId,
        o.UserId
    FROM Shipments s
    INNER JOIN Orders o
        ON o.OrderId = s.OrderId
    WHERE s.ShipmentId = @ShipmentId;
END
GO
