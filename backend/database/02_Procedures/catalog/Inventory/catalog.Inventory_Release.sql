USE [EcommerceDB];
GO

IF OBJECT_ID('catalog.Inventory_Release', 'P') IS NOT NULL
    DROP PROCEDURE catalog.Inventory_Release;
GO

CREATE OR ALTER PROCEDURE catalog.Inventory_Release
    @ProductId INT,
    @WarehouseId INT,
    @Quantity INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE catalog.Inventory
    SET 
        QuantityReserved = QuantityReserved - @Quantity,
        QuantityOnHand = QuantityOnHand + @Quantity,
        UpdatedAt = SYSUTCDATETIME()
    WHERE ProductId = @ProductId
      AND WarehouseId = @WarehouseId
      AND QuantityReserved >= @Quantity;

    IF @@ROWCOUNT = 0
        THROW 50002, 'Invalid release quantity', 1;
END
GO

PRINT 'Procedure catalog.Inventory_Release created or altered successfully.';
GO
