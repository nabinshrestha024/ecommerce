USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spCategories_Create
(
    @Name VARCHAR(300),
    @Slug VARCHAR(300),
    @CategoryImageURL VARCHAR(500),
    @Description VARCHAR(1000),
    @IsFeatured BIT,
    @SortOrder INT
)
AS
BEGIN
    INSERT INTO Categories
    (
        Name, Slug, CategoryImageURL, Description,
        IsFeatured, SortOrder
    )
    VALUES
    (
        @Name, @Slug, @CategoryImageURL, @Description,
        @IsFeatured, @SortOrder
    );

    SELECT SCOPE_IDENTITY() AS CategoryId;
END
GO
