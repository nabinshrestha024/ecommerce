USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spShipments_Create
    @OrderId INT,
    @ShippingCost DECIMAL(10,2) = NULL,
    @Notes VARCHAR(500) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM Orders WHERE OrderId = @OrderId)
    BEGIN
        RAISERROR('Order not found.', 16, 1);
        RETURN;
    END

    IF EXISTS (SELECT 1 FROM Shipments WHERE OrderId = @OrderId)
    BEGIN
        RAISERROR('Shipment already exists for this order.', 16, 1);
        RETURN;
    END

    INSERT INTO Shipments (OrderId, ShippingCost, Notes)
    VALUES (@OrderId, @ShippingCost, @Notes);
END
GO
