USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spProductImages_Insert
(
    @ProductId INT,
    @ImageUrl VARCHAR(500),
    @IsPrimary BIT,
    @SortOrder INT
)
AS
BEGIN
    INSERT INTO ProductImages(ProductId, ImageUrl, IsPrimary, SortOrder)
    VALUES (@ProductId, @ImageUrl, @IsPrimary, @SortOrder);
END
GO
