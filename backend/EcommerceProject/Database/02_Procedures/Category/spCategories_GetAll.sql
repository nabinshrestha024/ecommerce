USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spCategories_GetAll
(
    @Search VARCHAR(300) = NULL,
    @OnlyActive BIT = 1,
    @Page INT = NULL,
    @PageSize INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT COUNT(*) AS TotalCount
    FROM Categories
    WHERE
        (@OnlyActive = 0 OR IsActive = 1)
        AND (@Search IS NULL OR Name LIKE '%' + @Search + '%');

    SELECT *
    FROM Categories
    WHERE
        (@OnlyActive = 0 OR IsActive = 1)
        AND (@Search IS NULL OR Name LIKE '%' + @Search + '%')
    ORDER BY SortOrder, CreatedAt DESC
    OFFSET
        CASE
            WHEN @Page IS NULL OR @PageSize IS NULL
                THEN 0
            ELSE (@Page - 1) * @PageSize
        END ROWS
    FETCH NEXT
        CASE
            WHEN @PageSize IS NULL
                THEN 1000000   -- effectively "no pagination"
            ELSE @PageSize
        END ROWS ONLY;
END
GO
