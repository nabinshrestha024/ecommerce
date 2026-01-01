USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProductVariants_Delete
(
    @VariantId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @IsDefault BIT;

    SELECT @IsDefault = IsDefault
    FROM ProductVariants
    WHERE VariantId = @VariantId;

    IF @IsDefault IS NULL
    BEGIN
        RAISERROR('Variant not found.', 16, 1);
        RETURN;
    END

    IF @IsDefault = 1
    BEGIN
        RAISERROR('Default variant cannot be deleted.', 16, 1);
        RETURN;
    END

    UPDATE ProductVariants
    SET
        IsActive = 0,
        UpdatedAt = SYSUTCDATETIME()
    WHERE VariantId = @VariantId;

    SELECT @@ROWCOUNT AS Affected;
END
GO
