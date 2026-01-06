USE [EcommerceDB]
GO

CREATE OR ALTER PROCEDURE spStock_Adjust
    @VariantId INT,
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
            @CurrentStock = pv.StockQuantity,
            @ProductName = p.Name,
            @CategoryName = c.Name
        FROM ProductVariants pv
        INNER JOIN Products p ON pv.ProductId = p.ProductId
        LEFT JOIN Categories c ON p.CategoryId = c.CategoryId
        WHERE pv.variantId = @VariantId;
        
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
        
        UPDATE ProductVariants
        SET 
            StockQuantity = @NewStock,
            UpdatedAt = GETDATE()
        WHERE VariantId = @VariantId;
        
        SELECT 
            @VariantId AS VariantId,
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
