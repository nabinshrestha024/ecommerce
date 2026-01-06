USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProductVariants_Create
(
    @ProductId INT,
    @SKU VARCHAR(50),
    @Price DECIMAL(10,2),
    @StockQuantity INT,
    @IsDefault BIT,
    @IsActive BIT = 1,
    @AttributeValueIds VARCHAR(MAX) = NULL 
)
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRY
        BEGIN TRANSACTION;

        IF (@IsDefault = 1)
        BEGIN
            UPDATE ProductVariants
            SET IsDefault = 0
            WHERE ProductId = @ProductId;
        END

        INSERT INTO ProductVariants (
            ProductId, 
            SKU, 
            Price, 
            StockQuantity, 
            IsDefault, 
            IsActive, 
            CreatedAt
        )
        VALUES (
            @ProductId, 
            @SKU, 
            @Price, 
            @StockQuantity, 
            @IsDefault, 
            @IsActive, 
            GETUTCDATE()
        );

        DECLARE @NewVariantId INT = SCOPE_IDENTITY();

        IF (@AttributeValueIds IS NOT NULL AND LEN(@AttributeValueIds) > 0)
        BEGIN
            INSERT INTO VariantAttributeValues (VariantId, AttributeValueId)
            SELECT @NewVariantId, CAST(value AS INT)
            FROM STRING_SPLIT(@AttributeValueIds, ',');
        END

        COMMIT TRANSACTION;

        SELECT @NewVariantId AS VariantId;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO
