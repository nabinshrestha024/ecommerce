USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spPurchaseOrders_Create
    @VendorId INT,
    @Notes VARCHAR(500) = NULL,
    @CreatedBy INT,
    @ItemsJson NVARCHAR(MAX) 
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DECLARE @POId INT;
        DECLARE @TotalAmount DECIMAL(10,2) = 0;
        
        SELECT @TotalAmount = SUM(Quantity * UnitCost)
        FROM OPENJSON(@ItemsJson)
        WITH (
            ProductId INT '$.ProductId',
            Quantity INT '$.Quantity',
            UnitCost DECIMAL(10,2) '$.UnitCost'
        );
        
        INSERT INTO PurchaseOrders (VendorID, OrderDate, Status, TotalAmount, Notes, CreatedBy)
        VALUES (@VendorId, GETDATE(), 'Pending', @TotalAmount, @Notes, @CreatedBy);
        
        SET @POId = SCOPE_IDENTITY();
        
        INSERT INTO PurchaseOrderItems (POID, ProductID, Quantity, UnitCost)
        SELECT @POId, ProductId, Quantity, UnitCost
        FROM OPENJSON(@ItemsJson)
        WITH (
            ProductId INT '$.ProductId',
            Quantity INT '$.Quantity',
            UnitCost DECIMAL(10,2) '$.UnitCost'
        );
        
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

PRINT 'Procedure spPurchaseOrders_Create created successfully.';
GO