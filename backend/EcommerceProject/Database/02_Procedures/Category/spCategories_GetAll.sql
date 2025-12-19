USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spCategories_GetAll
(
    @Search VARCHAR(300) = NULL,
    @OnlyActive BIT = 1
)
AS
BEGIN
    SELECT *
    FROM Categories
    WHERE
        (@OnlyActive = 0 OR IsActive = 1)
        AND (@Search IS NULL OR Name LIKE '%' + @Search + '%')
    ORDER BY SortOrder, CreatedAt DESC;
END
GO
