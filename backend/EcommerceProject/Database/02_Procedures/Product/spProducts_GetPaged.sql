USE [EcommerceDB]
GO

CREATE OR ALTER PROCEDURE spProducts_GetPaged
(
    @CategoryId     INT             = NULL,
    @Search         VARCHAR(200)    = NULL,
    @CategoryName   VARCHAR(200)    = NULL,
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
        INNER JOIN Categories c ON p.CategoryId = c.CategoryId
        LEFT JOIN ProductVariants v
            ON v.ProductId = p.ProductId
           AND v.IsDefault = 1
           AND v.IsActive = 1
        WHERE
            (@CategoryId IS NULL OR p.CategoryId = @CategoryId)
             AND (@CategoryName IS NULL OR LOWER(c.Name) LIKE '%' + LOWER(@CategoryName) + '%')
            AND (@OnlyActive = 0 OR p.IsActive = 1)
            AND (
                @Search IS NULL
                OR p.Name LIKE '%' + @Search + '%'
                OR p.Slug LIKE '%' + @Search + '%'
            )
            AND (@MinPrice IS NULL OR v.Price >= @MinPrice)
            AND (@MaxPrice IS NULL OR v.Price <= @MaxPrice)
            AND (
                @TagNames IS NULL
                OR p.ProductId IN
                (
                    SELECT pt.ProductId
                    FROM ProductTags pt
                    INNER JOIN Tags t ON pt.TagId = t.TagId
                    WHERE LTRIM(RTRIM(t.Name)) IN
                          (SELECT LTRIM(RTRIM(value)) FROM STRING_SPLIT(@TagNames, ','))
                    GROUP BY pt.ProductId
                    HAVING COUNT(DISTINCT t.Name) =
                           (SELECT COUNT(*) FROM STRING_SPLIT(@TagNames, ','))
                )
            )
    )
    INSERT INTO #PagedIds (ProductId)
    SELECT ProductId
    FROM FilteredProducts
    ORDER BY ProductId DESC
    OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;

    SELECT
        p.ProductId,
        p.CategoryId,
        c.Name AS CategoryName,
        p.Name,
        p.Slug,
        p.Description,
        p.ShortDescription,
        p.HasVariants,
        p.IsActive,
        p.CreatedAt,
        p.UpdatedAt,
        v.Price AS Price,
        v.StockQuantity,
         CASE WHEN d.DiscountId IS NOT NULL THEN d.DiscountId ELSE NULL END AS DiscountId,
        d.DiscountType,
        d.DiscountValue,

       
        CASE
            WHEN d.DiscountType = 'Percentage'
                THEN v.Price - (v.Price * d.DiscountValue / 100)
            WHEN d.DiscountType = 'Flat'
                THEN v.Price - d.DiscountValue
            ELSE v.Price
        END AS FinalPrice,

        (
            SELECT TOP 1 pi.ImageUrl
            FROM ProductImages pi
            WHERE pi.ProductId = p.ProductId
            ORDER BY pi.IsPrimary DESC, pi.SortOrder ASC
        ) AS PrimaryImageUrl

    FROM Products p
    INNER JOIN Categories c ON p.CategoryId = c.CategoryId
    LEFT JOIN ProductVariants v
        ON v.ProductId = p.ProductId
        AND v.IsDefault = 1
        AND v.IsActive = 1
    LEFT JOIN Discounts d
        ON d.DiscountId = v.DiscountId
        AND d.IsActive = 1
        AND (d.StartDate IS NULL OR d.StartDate <= GETDATE())
        AND (d.EndDate IS NULL OR d.EndDate >= GETDATE())
    WHERE p.ProductId IN (SELECT ProductId FROM #PagedIds)
    ORDER BY p.ProductId DESC;

  
    SELECT
        pv.VariantId,
        pv.ProductId,
        pv.SKU,
        pv.Price,
        CASE WHEN d.DiscountId IS NOT NULL THEN d.DiscountId ELSE NULL END AS DiscountId,
        d.DiscountType,
        d.DiscountValue,
        CASE
            WHEN d.DiscountType = 'Percentage'
                THEN pv.Price - (pv.Price * d.DiscountValue / 100)
            WHEN d.DiscountType = 'Flat'
                THEN pv.Price - d.DiscountValue
            ELSE pv.Price
        END AS FinalPrice,
        pv.StockQuantity,
        pv.IsActive,
        pv.IsDefault
    FROM ProductVariants pv
    LEFT JOIN Discounts d
        ON d.DiscountId = pv.DiscountId
        AND d.IsActive = 1
        AND (d.StartDate IS NULL OR d.StartDate <= GETDATE())
        AND (d.EndDate IS NULL OR d.EndDate >= GETDATE())
    WHERE pv.ProductId IN (SELECT ProductId FROM #PagedIds)
    ORDER BY pv.IsDefault DESC;

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
    INNER JOIN Categories c ON p.CategoryId = c.CategoryId
    LEFT JOIN ProductVariants v
        ON v.ProductId = p.ProductId
       AND v.IsDefault = 1
       AND v.IsActive = 1
    WHERE
        (@CategoryId IS NULL OR p.CategoryId = @CategoryId)
         AND (@CategoryName IS NULL OR LOWER(c.Name) LIKE '%' + LOWER(@CategoryName) + '%')
        AND (@OnlyActive = 0 OR p.IsActive = 1)
        AND (@MinPrice IS NULL OR v.Price >= @MinPrice)
        AND (@MaxPrice IS NULL OR v.Price <= @MaxPrice);

  
    SELECT ISNULL(MAX(v.Price), 0)
    FROM ProductVariants v
    INNER JOIN Products p ON v.ProductId = p.ProductId
    WHERE p.IsActive = 1;

    DROP TABLE #PagedIds;
END
GO
