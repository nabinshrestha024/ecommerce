USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spPurchaseOrders_Receive
    @POId INT,
    @ReceivedBy INT,
    @ReceivedItemsJson VARCHAR(MAX)  
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        IF NOT EXISTS (SELECT 1 FROM PurchaseOrders WHERE POId = @POId AND Status IN ('Approved', 'Received'))
        BEGIN
            RAISERROR('Purchase order not found or not approved/received', 16, 1);
            ROLLBACK TRANSACTION;
            RETURN;
        END
        
        UPDATE PurchaseOrders 
        SET Status = 'Received'
        WHERE POId = @POId;
        
        UPDATE poi
        SET poi.ReceivedQuantity = ISNULL(poi.ReceivedQuantity, 0) + ri.ReceivedQuantity
        FROM PurchaseOrderItems poi
        INNER JOIN (
            SELECT 
                CAST(JSON_VALUE(value, '$.POItemId') AS INT) AS POItemId,
                CAST(JSON_VALUE(value, '$.ReceivedQuantity') AS INT) AS ReceivedQuantity
            FROM OPENJSON(@ReceivedItemsJson)
        ) ri ON poi.POItemId = ri.POItemId
        WHERE poi.POId = @POId;

        UPDATE p
        SET p.StockQuantity = p.StockQuantity + ri.ReceivedQuantity,
            p.UpdatedAt = GETDATE()
        FROM Products p
        INNER JOIN (
            SELECT 
                poi.ProductId,
                ri.ReceivedQuantity
            FROM PurchaseOrderItems poi
            INNER JOIN (
                SELECT 
                    CAST(JSON_VALUE(value, '$.POItemId') AS INT) AS POItemId,
                    CAST(JSON_VALUE(value, '$.ReceivedQuantity') AS INT) AS ReceivedQuantity
                FROM OPENJSON(@ReceivedItemsJson)
            ) ri ON poi.POItemId = ri.POItemId
            WHERE poi.POId = @POId
        ) ri ON p.ProductId = ri.ProductId;
        
        EXEC spPurchaseOrders_GetById @POId = @POId;
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO