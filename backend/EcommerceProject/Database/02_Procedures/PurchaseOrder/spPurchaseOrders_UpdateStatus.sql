USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spPurchaseOrders_UpdateStatus
    @POId INT,
    @Status VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE PurchaseOrders 
    SET Status = @Status
    WHERE POId = @POId;
    
    EXEC spPurchaseOrders_GetById @POId;
END
GO

PRINT 'Procedure spPurchaseOrders_UpdateStatus created successfully.';
GO