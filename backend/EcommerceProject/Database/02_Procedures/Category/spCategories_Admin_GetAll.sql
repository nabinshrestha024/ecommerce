USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spCategories_Admin_GetAll
(
    @Search VARCHAR(300) = NULL,
    @IsActive BIT = NULL,
    @Page INT = NULL,
    @PageSize INT = NULL
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT COUNT(*) AS TotalCount
    FROM Categories
    WHERE
        (@IsActive IS NULL OR IsActive = @IsActive)
        AND (@Search IS NULL OR Name LIKE '%' + @Search + '%');

    SELECT *
    FROM Categories
    WHERE
        (@IsActive IS NULL OR IsActive = @IsActive)
        AND (@Search IS NULL OR Name LIKE '%' + @Search + '%')
    ORDER BY SortOrder, CreatedAt ASC
    OFFSET
        CASE WHEN @Page IS NULL OR @PageSize IS NULL THEN 0
             ELSE (@Page - 1) * @PageSize
        END ROWS
    FETCH NEXT
        CASE WHEN @PageSize IS NULL THEN 1000000
             ELSE @PageSize
        END ROWS ONLY
END

