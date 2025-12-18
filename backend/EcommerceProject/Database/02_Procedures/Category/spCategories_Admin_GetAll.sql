USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spCategories_Admin_GetAll
(
    @Search VARCHAR(300) = NULL,
    @IsActive BIT = NULL
)
AS
BEGIN
    SELECT *
    FROM Categories
    WHERE
        (@Search IS NULL OR Name LIKE '%' + @Search + '%')
        AND (@IsActive IS NULL OR IsActive = @IsActive)
    ORDER BY SortOrder, CreatedAt DESC;
END
GO
