USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spPurchaseOrders_Receive
    @POId INT,
    @ReceivedBy INT,
    @ReceivedItemsJson NVARCHAR(MAX)  
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        IF NOT EXISTS (SELECT 1 FROM PurchaseOrders WHERE POID = @POId AND Status = 'Approved')
        BEGIN
            RAISERROR('Purchase order not found or not approved', 16, 1);
            RETURN;
        END
        
        UPDATE PurchaseOrders 
        SET Status = 'Received'
        WHERE POID = @POId;
        
        UPDATE p
        SET p.StockQuantity = p.StockQuantity + ri.ReceivedQuantity,
            p.UpdatedAt = GETDATE()
        FROM Products p
        INNER JOIN (
            SELECT 
                JSON_VALUE(value, '$.POItemId') AS POItemId,
                JSON_VALUE(value, '$.ReceivedQuantity') AS ReceivedQuantity
            FROM OPENJSON(@ReceivedItemsJson)
        ) ri ON p.ProductID = (
            SELECT poi.ProductID 
            FROM PurchaseOrderItems poi 
            WHERE poi.POItemID = ri.POItemId
        );
        
        INSERT INTO StockAdjustments (ProductID, AdjustmentQuantity, Reason, AdjustedBy, AdjustedAt)
        SELECT 
            poi.ProductID,
            ri.ReceivedQuantity,
            'Purchase Order Received - PO#' + CAST(@POId AS VARCHAR(10)),
            @ReceivedBy,
            GETDATE()
        FROM PurchaseOrderItems poi
        INNER JOIN (
            SELECT 
                CAST(JSON_VALUE(value, '$.POItemId') AS INT) AS POItemId,
                CAST(JSON_VALUE(value, '$.ReceivedQuantity') AS INT) AS ReceivedQuantity
            FROM OPENJSON(@ReceivedItemsJson)
        ) ri ON poi.POItemID = ri.POItemId;
        
        EXEC spPurchaseOrders_GetById @POId;
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

PRINT 'Procedure spPurchaseOrders_Receive created successfully.';
GO