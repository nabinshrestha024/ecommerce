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
        
        -- Get current stock, product name, and category
        SELECT 
            @CurrentStock = p.StockQuantity,
            @ProductName = p.Name,
            @CategoryName = c.Name
        FROM Products p
        LEFT JOIN Categories c ON p.CategoryID = c.CategoryID
        WHERE p.ProductID = @ProductId;
        
        IF @CurrentStock IS NULL
        BEGIN
            RAISERROR('Product not found', 16, 1);
            RETURN;
        END
        
        -- Calculate new stock
        SET @NewStock = @CurrentStock + @AdjustmentQuantity;
        
        IF @NewStock < 0
        BEGIN
            RAISERROR('Stock cannot be negative', 16, 1);
            RETURN;
        END
        
        -- Update product stock
        UPDATE Products 
        SET 
            StockQuantity = @NewStock,
            UpdatedAt = GETDATE()
        WHERE ProductID = @ProductId;
        
        -- Return adjustment information (without saving to history table)
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