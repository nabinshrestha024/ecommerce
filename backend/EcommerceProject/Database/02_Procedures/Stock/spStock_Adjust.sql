USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spStock_Adjust
    @ProductId INT,
    @AdjustmentQuantity INT,
    @Reason VARCHAR(200),
    @Notes VARCHAR(500) = NULL,
    @AdjustedBy INT
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DECLARE @CurrentStock INT;
        DECLARE @NewStock INT;
        DECLARE @ProductName VARCHAR(200);
        DECLARE @CategoryName VARCHAR(300);

        SELECT 
            @CurrentStock = p.StockQuantity,
            @ProductName = p.Name,
            @CategoryName = c.Name
        FROM Products p
        LEFT JOIN Categories c ON p.CategoryId = c.CategoryId
        WHERE p.ProductId = @ProductId;
        
        IF @CurrentStock IS NULL
        BEGIN
            RAISERROR('Product not found', 16, 1);
            RETURN;
        END
        
        SET @NewStock = @CurrentStock + @AdjustmentQuantity;
        
        IF @NewStock < 0
        BEGIN
            RAISERROR('Stock cannot be negative', 16, 1);
            RETURN;
        END
        
        UPDATE Products 
        SET 
            StockQuantity = @NewStock,
            UpdatedAt = GETDATE()
        WHERE ProductId = @ProductId;
        
        SELECT 
            @ProductId AS ProductId,
            @ProductName AS ProductName,
            @AdjustmentQuantity AS AdjustmentQuantity,
            @CurrentStock AS PreviousStock,
            @NewStock AS NewStockLevel,
            @Reason AS Reason,
            @Notes AS Notes,
            @AdjustedBy AS AdjustedBy,
            GETDATE() AS AdjustedAt;
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

PRINT 'Procedure spStock_Adjust created successfully.';
GO