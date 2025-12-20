CREATE OR ALTER PROCEDURE spProducts_GetPaged
    @Page           INT = 1,
    @PageSize       INT = 20,
    @Search         NVARCHAR(200) = NULL,
    @CategoryId     INT = NULL,
    @IsActive       BIT = NULL,
    @MinPrice       DECIMAL(10,2) = NULL,
    @MaxPrice       DECIMAL(10,2) = NULL,
    @SortBy         VARCHAR(20) = 'createdAt',  -- createdAt | price | name
    @SortDir        VARCHAR(4)  = 'desc'        -- asc | desc
AS
BEGIN
    SET NOCOUNT ON;

    IF (@Page < 1) SET @Page = 1;
    IF (@PageSize < 1) SET @PageSize = 20;

    ;WITH Q AS (
        SELECT p.*
        FROM dbo.Products p
        WHERE
            (@Search IS NULL OR p.Name LIKE '%' + @Search + '%' OR p.Slug LIKE '%' + @Search + '%' OR p.SKU LIKE '%' + @Search + '%')
            AND (@CategoryId IS NULL OR p.CategoryId = @CategoryId)
            AND (@IsActive IS NULL OR p.IsActive = @IsActive)
            AND (@MinPrice IS NULL OR p.Price >= @MinPrice)
            AND (@MaxPrice IS NULL OR p.Price <= @MaxPrice)
    ),
    C AS (
        SELECT COUNT(1) AS TotalCount FROM Q
    )
    SELECT
        q.ProductID, q.Name, q.Slug, q.Description, q.ShortDescription, q.Price,
        q.CategoryID, q.StockQuantity, q.SKU, q.Brand, q.ProductImageURL,
        q.IsActive, q.CreatedAt, q.UpdatedAt,
        c.TotalCount
    FROM Q q
    CROSS JOIN C c
    ORDER BY
        CASE WHEN @SortBy='price' AND @SortDir='asc'  THEN q.Price END ASC,
        CASE WHEN @SortBy='price' AND @SortDir='desc' THEN q.Price END DESC,
        CASE WHEN @SortBy='name'  AND @SortDir='asc'  THEN q.Name  END ASC,
        CASE WHEN @SortBy='name'  AND @SortDir='desc' THEN q.Name  END DESC,
        CASE WHEN @SortBy='createdAt' AND @SortDir='asc'  THEN q.CreatedAt END ASC,
        CASE WHEN @SortBy='createdAt' AND @SortDir='desc' THEN q.CreatedAt END DESC,
        q.ProductID DESC
    OFFSET (@Page - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY
END
GO