CREATE OR ALTER PROCEDURE spProducts_Update
    @ProductId INT,
    @Name NVARCHAR(200),
    @Slug VARCHAR(200),
    @Description NVARCHAR(MAX) = NULL,
    @ShortDescription NVARCHAR(500) = NULL,
    @Price DECIMAL(10,2),
    @CategoryId INT,
    @StockQuantity INT,
    @SKU VARCHAR(50),
    @Brand NVARCHAR(100) = NULL,
    @ProductImageURL VARCHAR(500) = NULL,
    @IsActive BIT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE dbo.Products
    SET
        Name=@Name,
        Slug=@Slug,
        Description=@Description,
        ShortDescription=@ShortDescription,
        Price=@Price,
        CategoryID=@CategoryID,
        StockQuantity=@StockQuantity,
        SKU=@SKU,
        Brand=@Brand,
        ProductImageURL=@ProductImageURL,
        IsActive=@IsActive,
        UpdatedAt=GETDATE()
    WHERE ProductId=@ProductId;

    SELECT @@ROWCOUNT AS Affected;
END
GO
