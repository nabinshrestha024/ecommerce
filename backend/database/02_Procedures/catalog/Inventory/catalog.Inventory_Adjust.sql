USE [EcommerceDB];
GO

IF OBJECT_ID('catalog.Inventory_Adjust', 'P') IS NOT NULL
    DROP PROCEDURE catalog.Inventory_Adjust;
GO

CREATE OR ALTER PROCEDURE catalog.Inventory_Adjust
    @ProductId INT,
    @WarehouseId INT,
    @QuantityDelta INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE catalog.Inventory
    SET 
        QuantityOnHand = QuantityOnHand + @QuantityDelta,
        UpdatedAt = SYSUTCDATETIME()
    WHERE ProductId = @ProductId AND WarehouseId = @WarehouseId;

    IF @@ROWCOUNT = 0
    BEGIN
        INSERT INTO catalog.Inventory
        (ProductId, WarehouseId, QuantityOnHand, QuantityReserved, ReorderLevel, UpdatedAt)
        VALUES
        (@ProductId, @WarehouseId, @QuantityDelta, 0, 0, SYSUTCDATETIME());
    END
END
GO

PRINT 'Procedure catalog.Inventory_Adjust created or altered successfully.';
GO