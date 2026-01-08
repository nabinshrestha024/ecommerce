USE [EcommerceDB]
GO

CREATE OR ALTER PROCEDURE spProducts_GetPaged
(
    @CategoryId     INT             = NULL,
    @Search         VARCHAR(200)    = NULL,
    @TagNames       VARCHAR(MAX)    = NULL,  
    @MinPrice       DECIMAL(10,2)   = NULL,
    @MaxPrice       DECIMAL(10,2)   = NULL,
    @Page           INT             = 1,
    @PageSize       INT             = 10,
    @OnlyActive     BIT             = 1
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Offset INT = (@Page - 1) * @PageSize;

    ;WITH FilteredProducts AS
    (
        SELECT DISTINCT p.ProductId
        FROM Products p
        LEFT JOIN ProductVariants v
            ON v.ProductId = p.ProductId
           AND v.IsDefault = 1
           AND v.IsActive = 1
        LEFT JOIN ProductTags pt ON p.ProductId = pt.ProductId
        LEFT JOIN Tags t ON pt.TagId = t.TagId
        WHERE
            (@CategoryId IS NULL OR p.CategoryId = @CategoryId)
            AND (@OnlyActive = 0 OR p.IsActive = 1)
            AND (
                @Search IS NULL
                OR p.Name LIKE '%' + @Search + '%'
                OR p.Slug LIKE '%' + @Search + '%'
            )
            AND (
                @MinPrice IS NULL
                OR (v.Price IS NOT NULL AND v.Price >= @MinPrice)
            )
            AND (
                 @MaxPrice IS NULL
                 OR (v.Price IS NOT NULL AND v.Price <= @MaxPrice)
            )

            AND (
                @TagNames IS NULL
                OR t.Name IN (SELECT value FROM STRING_SPLIT(@TagNames, ','))
            )
    )
    SELECT ProductId INTO #PagedIds
    FROM FilteredProducts
    ORDER BY ProductId DESC
    OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;

    SELECT
    p.*,
    c.Name AS CategoryName,
    (
        SELECT TOP 1 pi.ImageUrl
        FROM ProductImages pi
        WHERE pi.ProductId = p.ProductId
        ORDER BY pi.IsPrimary DESC, pi.SortOrder ASC
    ) AS PrimaryImageUrl
FROM Products p
INNER JOIN Categories c ON p.CategoryId = c.CategoryId
WHERE p.ProductId IN (SELECT ProductId FROM #PagedIds)
ORDER BY p.ProductId DESC;


    SELECT * FROM ProductVariants
    WHERE ProductId IN (SELECT ProductId FROM #PagedIds)
    ORDER BY IsDefault DESC;

    SELECT
        vav.VariantId,
        pv.ProductId,
        pa.Name AS AttributeName,
        pav.Value AS AttributeValue
    FROM VariantAttributeValues vav
    INNER JOIN ProductAttributeValues pav ON vav.AttributeValueId = pav.AttributeValueId
    INNER JOIN ProductAttributes pa ON pav.AttributeId = pa.AttributeId
    INNER JOIN ProductVariants pv ON vav.VariantId = pv.VariantId
    WHERE pv.ProductId IN (SELECT ProductId FROM #PagedIds);

    SELECT * FROM ProductImages
    WHERE ProductId IN (SELECT ProductId FROM #PagedIds);

    SELECT COUNT(DISTINCT p.ProductId)
    FROM Products p
    LEFT JOIN ProductVariants v ON v.ProductId = p.ProductId AND v.IsDefault = 1 AND v.IsActive = 1
    LEFT JOIN ProductTags pt ON p.ProductId = pt.ProductId
    LEFT JOIN Tags t ON pt.TagId = t.TagId
    WHERE
        (@CategoryId IS NULL OR p.CategoryId = @CategoryId)
        AND (@OnlyActive = 0 OR p.IsActive = 1)
        AND (@MinPrice IS NULL OR v.Price >= @MinPrice)
        AND (@MaxPrice IS NULL OR v.Price <= @MaxPrice)
        AND (
            @TagNames IS NULL
            OR t.Name IN (SELECT value FROM STRING_SPLIT(@TagNames, ','))
        );
END
GO