USE [EcommerceDB]
GO

CREATE OR ALTER PROCEDURE [dbo].[spProducts_GetPaged]
(
    @CategoryId     INT             = NULL,
    @Search         VARCHAR(200)    = NULL,
    @Page           INT             = 1,
    @PageSize       INT             = 10,
    @OnlyActive     BIT             = 1
)
AS
BEGIN
    SET NOCOUNT ON;

    IF (@Page < 1) SET @Page = 1;
    IF (@PageSize < 1) SET @PageSize = 10;

    DECLARE @Offset INT = (@Page - 1) * @PageSize;

    ;WITH Filtered AS
    (
        SELECT
            p.ProductId,
            p.CategoryId,
            c.Name AS CategoryName,
            p.Name,
            p.Slug,
            p.Description,
            p.ShortDescription,
            --p.HasVariants,
            CAST(CASE WHEN p.HasVariants = 1 THEN 0 ELSE 1 END AS BIT) AS HasVariants,
            p.IsActive,
            p.CreatedAt,
            p.UpdatedAt,

            v.VariantId,
            v.SKU,
            v.Price,
            v.StockQuantity,

            PrimaryImageUrl = (
                SELECT TOP 1 pi.ImageUrl
                FROM ProductImages pi
                WHERE pi.ProductId = p.ProductId
                ORDER BY pi.IsPrimary DESC, pi.SortOrder ASC, pi.ProductImageId ASC
            )
        FROM Products p
        INNER JOIN Categories c
            ON p.CategoryId = c.CategoryId
        INNER JOIN ProductVariants v
            ON v.ProductId = p.ProductId
           AND v.IsDefault = 1
           AND v.IsActive = 1
        WHERE
            (@CategoryId IS NULL OR p.CategoryId = @CategoryId)
            AND (
                @Search IS NULL OR @Search = '' OR
                p.Name LIKE '%' + @Search + '%' OR
                p.Slug LIKE '%' + @Search + '%' OR
                v.SKU  LIKE '%' + @Search + '%'
            )
            AND (@OnlyActive = 0 OR p.IsActive = 1)
    )
    SELECT *
    FROM Filtered
    ORDER BY ProductId DESC
    OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;

    SELECT TotalCount = COUNT(1)
    FROM Products p
    INNER JOIN ProductVariants v
        ON v.ProductId = p.ProductId
       AND v.IsDefault = 1
       AND v.IsActive = 1
    WHERE
        (@CategoryId IS NULL OR p.CategoryId = @CategoryId)
        AND (
            @Search IS NULL OR @Search = '' OR
            p.Name LIKE '%' + @Search + '%' OR
            p.Slug LIKE '%' + @Search + '%' OR
            v.SKU  LIKE '%' + @Search + '%'
        )
        AND (@OnlyActive = 0 OR p.IsActive = 1);
END
GO
