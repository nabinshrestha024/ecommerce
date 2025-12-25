USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spCategories_GetMaxSlugSuffix
(
    @BaseSlug VARCHAR(200)
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT MAX(
        CASE
            WHEN Slug = @BaseSlug THEN 0
            WHEN Slug LIKE @BaseSlug + '-%' 
                 AND TRY_CONVERT(
                     INT,
                     RIGHT(Slug, LEN(Slug) - LEN(@BaseSlug) - 1)
                 ) IS NOT NULL
            THEN TRY_CONVERT(
                     INT,
                     RIGHT(Slug, LEN(Slug) - LEN(@BaseSlug) - 1)
                 )
        END
    ) AS MaxSuffix
    FROM Products
    WHERE Slug = @BaseSlug
       OR Slug LIKE @BaseSlug + '-%';
END
GO
