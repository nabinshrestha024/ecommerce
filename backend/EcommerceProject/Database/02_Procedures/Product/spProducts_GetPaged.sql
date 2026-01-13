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

    CREATE TABLE #PagedIds
    (
        ProductId INT PRIMARY KEY
    );

    ;WITH FilteredProducts AS
    (
        SELECT DISTINCT p.ProductId
        FROM Products p
        LEFT JOIN ProductVariants v
            ON v.ProductId = p.ProductId
           AND v.IsDefault = 1
           AND v.IsActive = 1
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
                OR p.ProductId IN
                (
                    SELECT pt2.ProductId
                    FROM ProductTags pt2
                    INNER JOIN Tags t2 ON pt2.TagId = t2.TagId
                    WHERE LTRIM(RTRIM(t2.Name)) IN
                          (SELECT LTRIM(RTRIM(value))
                           FROM STRING_SPLIT(@TagNames, ','))
                    GROUP BY pt2.ProductId
                    HAVING COUNT(DISTINCT t2.Name) =
                           (SELECT COUNT(*)
                            FROM STRING_SPLIT(@TagNames, ','))
                )
            )
    )
    INSERT INTO #PagedIds (ProductId)
    SELECT ProductId
    FROM FilteredProducts
    ORDER BY ProductId
    OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;

    SELECT
        p.*,
        c.Name AS CategoryName,
        (
            SELECT TOP 1 pi.ImageUrl
            FROM ProductImages pi
            WHERE pi.ProductId = p.ProductId
            ORDER BY pi.IsPrimary ASC, pi.SortOrder ASC
        ) AS PrimaryImageUrl
    FROM Products p
    LEFT JOIN Categories c ON p.CategoryId = c.CategoryId
    WHERE p.ProductId IN (SELECT ProductId FROM #PagedIds)
    ORDER BY p.ProductId ASC;

    SELECT *
    FROM ProductVariants
    WHERE ProductId IN (SELECT ProductId FROM #PagedIds)
    ORDER BY IsDefault ASC;

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

    SELECT *
    FROM ProductImages
    WHERE ProductId IN (SELECT ProductId FROM #PagedIds);

    SELECT COUNT(DISTINCT p.ProductId)
    FROM Products p
    LEFT JOIN ProductVariants v
        ON v.ProductId = p.ProductId
       AND v.IsDefault = 1
       AND v.IsActive = 1
    WHERE
        (@CategoryId IS NULL OR p.CategoryId = @CategoryId)
        AND (@OnlyActive = 0 OR p.IsActive = 1)
        AND (@MinPrice IS NULL OR v.Price >= @MinPrice)
        AND (@MaxPrice IS NULL OR v.Price <= @MaxPrice)
        AND (
            @TagNames IS NULL
            OR p.ProductId IN
            (
                SELECT pt2.ProductId
                FROM ProductTags pt2
                INNER JOIN Tags t2 ON pt2.TagId = t2.TagId
                WHERE LTRIM(RTRIM(t2.Name)) IN
                      (SELECT LTRIM(RTRIM(value))
                       FROM STRING_SPLIT(@TagNames, ','))
                GROUP BY pt2.ProductId
                HAVING COUNT(DISTINCT t2.Name) =
                       (SELECT COUNT(*)
                        FROM STRING_SPLIT(@TagNames, ','))
            )
        );

    SELECT ISNULL(MAX(v.Price), 0)
    FROM ProductVariants v
    INNER JOIN Products p ON v.ProductId = p.ProductId
    WHERE p.IsActive = 1;

    DROP TABLE #PagedIds;
END
GO
