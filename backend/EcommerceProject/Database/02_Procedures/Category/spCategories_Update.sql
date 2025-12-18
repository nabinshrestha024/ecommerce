USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spCategories_Update
(
    @CategoryId INT,
    @Name VARCHAR(300),
    @Slug VARCHAR(300),
    @CategoryImageURL VARCHAR(500),
    @Description VARCHAR(1000),
    @IsFeatured BIT,
    @SortOrder INT,
    @IsActive BIT
)
AS
BEGIN
    UPDATE Categories
    SET
        Name = @Name,
        Slug = @Slug,
        CategoryImageURL = @CategoryImageURL,
        Description = @Description,
        IsFeatured = @IsFeatured,
        SortOrder = @SortOrder,
        IsActive = @IsActive
    WHERE CategoryId = @CategoryId;
END
GO
