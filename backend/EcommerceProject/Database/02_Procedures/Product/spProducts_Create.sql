CREATE OR ALTER PROCEDURE spProducts_Create
    @Name NVARCHAR(200),
    @Slug VARCHAR(200),
    @Description NVARCHAR(MAX) = NULL,
    @ShortDescription NVARCHAR(500) = NULL,
    @Price DECIMAL(10,2),
    @CategoryID INT,
    @StockQuantity INT = 0,
    @SKU VARCHAR(50),
    @Brand NVARCHAR(100) = NULL,
    @ProductImageURL VARCHAR(500) = NULL,
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO dbo.Products
    (Name, Slug, Description, ShortDescription, Price, CategoryID, StockQuantity, SKU, Brand, ProductImageURL, IsActive, CreatedAt, UpdatedAt)
    VALUES
    (@Name, @Slug, @Description, @ShortDescription, @Price, @CategoryID, @StockQuantity, @SKU, @Brand, @ProductImageURL, @IsActive, GETDATE(), GETDATE());

    SELECT CAST(SCOPE_IDENTITY() AS INT) AS ProductID;
END
GO