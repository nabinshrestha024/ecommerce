USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spProductImages_Insert
(
    @ProductId INT,
    @VariantId INT = NULL,
    @ImageUrl VARCHAR(500),
    @IsPrimary BIT,
    @SortOrder INT
)
AS
BEGIN
    INSERT INTO ProductImages
    (
        ProductId,
        VariantId,
        ImageUrl,
        IsPrimary,
        SortOrder
    )
    VALUES
    (
        @ProductId,
        @VariantId,
        @ImageUrl,
        @IsPrimary,
        @SortOrder
    );
END
GO
