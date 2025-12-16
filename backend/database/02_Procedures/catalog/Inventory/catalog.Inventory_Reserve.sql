USE [EcommerceDB];
GO

IF OBJECT_ID('catalog.Inventory_Reserve', 'P') IS NOT NULL
    DROP PROCEDURE catalog.Inventory_Reserve;
GO

CREATE OR ALTER PROCEDURE catalog.Inventory_Reserve
    @ProductId INT,
    @WarehouseId INT,
    @Quantity INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE catalog.Inventory
    SET 
        QuantityReserved = QuantityReserved + @Quantity,
        QuantityOnHand = QuantityOnHand - @Quantity,
        UpdatedAt = SYSUTCDATETIME()
    WHERE ProductId = @ProductId
      AND WarehouseId = @WarehouseId
      AND QuantityOnHand >= @Quantity;

    IF @@ROWCOUNT = 0
        THROW 50001, 'Insufficient stock', 1;
END
GO

PRINT 'Procedure catalog.Inventory_Reserve created or altered successfully.';
GO
