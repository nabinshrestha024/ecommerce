Use EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProductVariants_Update
(
    @VariantId INT,
    @Price DECIMAL(10,2),
    @StockQuantity INT,
    @IsActive BIT,
    @IsDefault BIT
)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @ProductId INT;

    SELECT @ProductId = ProductId
    FROM ProductVariants
    WHERE VariantId = @VariantId;

    IF (@IsDefault = 1)
    BEGIN
        UPDATE ProductVariants
        SET IsDefault = 0
        WHERE ProductId = (
            SELECT ProductId FROM ProductVariants WHERE VariantId = @VariantId
        );
    END

    UPDATE ProductVariants
    SET
        Price = @Price,
        StockQuantity = @StockQuantity,
        IsActive = @IsActive,
        IsDefault = @IsDefault,
        UpdatedAt = SYSUTCDATETIME()
    WHERE VariantId = @VariantId;

    SELECT @@ROWCOUNT AS Affected;
END
GO
