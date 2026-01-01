USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProductVariants_SetDefault
(
    @VariantId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @ProductId INT;

    SELECT @ProductId = ProductId
    FROM ProductVariants
    WHERE VariantId = @VariantId;

    IF @ProductId IS NULL
    BEGIN
        RAISERROR('Variant not found.', 16, 1);
        RETURN;
    END

    UPDATE ProductVariants
    SET IsDefault = 0
    WHERE ProductId = @ProductId;

    UPDATE ProductVariants
    SET
        IsDefault = 1,
        UpdatedAt = SYSUTCDATETIME()
    WHERE VariantId = @VariantId;

    SELECT @@ROWCOUNT AS Affected;
END
GO
