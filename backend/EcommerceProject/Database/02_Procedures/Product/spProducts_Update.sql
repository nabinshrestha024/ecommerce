USE EcommerceDB;
GO

USE EcommerceDB;
Go

CREATE OR ALTER PROCEDURE spProducts_Update
(
    @ProductId INT,
    @CategoryId INT,
    @Name VARCHAR(200),
    @Slug VARCHAR(200),
    @Description VARCHAR(MAX) = NULL,
    @ShortDescription VARCHAR(500) = NULL,
    @Price DECIMAL(10,2),
    @StockQuantity INT,
    @SKU VARCHAR(50),
    @IsActive BIT
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE Products
    SET
        CategoryId = @CategoryId,
        Name = @Name,
        Slug = @Slug,
        Description = @Description,
        ShortDescription = @ShortDescription,
        Price = @Price,
        StockQuantity = @StockQuantity,
        SKU = @SKU,
        IsActive = @IsActive,
        UpdatedAt = SYSUTCDATETIME()
    WHERE ProductId = @ProductId;

    SELECT @@ROWCOUNT AS Affected;
END
GO
