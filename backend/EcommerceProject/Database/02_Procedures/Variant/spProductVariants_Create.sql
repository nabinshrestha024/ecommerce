USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProductVariants_Create
(
    @ProductId INT,
    @SKU VARCHAR(50),
    @Price DECIMAL(10,2),
    @StockQuantity INT,
    @IsDefault BIT = 1,
    @IsActive BIT = 1
)
AS
BEGIN
    SET NOCOUNT ON;

    IF (@IsDefault = 1)
    BEGIN
        UPDATE ProductVariants
        SET IsDefault = 0
        WHERE ProductId = @ProductId;
    END

    INSERT INTO ProductVariants
    (
        ProductId,
        SKU,
        Price,
        StockQuantity,
        IsDefault,
        IsActive
    )
    VALUES
    (
        @ProductId,
        @SKU,
        @Price,
        @StockQuantity,
        @IsDefault,
        @IsActive
    );

    SELECT SCOPE_IDENTITY() AS VariantId;
END
GO
