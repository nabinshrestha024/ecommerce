USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE dbo.spDiscount_Update
(
    @DiscountId INT,
    @DiscountName NVARCHAR(100),
    @DiscountType NVARCHAR(20),      -- Flat | Percentage
    @DiscountValue DECIMAL(18,2),
    @StartDate DATETIME,
    @EndDate DATETIME,
    @IsActive BIT,
    @ProductIds NVARCHAR(MAX) = NULL,   
    @VariantIds NVARCHAR(MAX) = NULL    
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    BEGIN TRY
        
        UPDATE Discounts
        SET
            DiscountName = @DiscountName,
            DiscountType = @DiscountType,
            DiscountValue = @DiscountValue,
            StartDate = @StartDate,
            EndDate = @EndDate,
            IsActive = @IsActive
        WHERE DiscountId = @DiscountId;

        
        DELETE FROM DiscountAssigns
        WHERE DiscountId = @DiscountId;

        
        IF @ProductIds IS NOT NULL
        BEGIN
            INSERT INTO DiscountAssigns (DiscountId, ProductId)
            SELECT @DiscountId, value
            FROM STRING_SPLIT(@ProductIds, ',')
            WHERE TRY_CAST(value AS INT) IS NOT NULL;
        END

        
        IF @VariantIds IS NOT NULL
        BEGIN
            INSERT INTO DiscountAssigns (DiscountId, VariantId)
            SELECT @DiscountId, value
            FROM STRING_SPLIT(@VariantIds, ',')
            WHERE TRY_CAST(value AS INT) IS NOT NULL;
        END

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO
