USE [EcommerceDB]
GO

CREATE OR ALTER PROCEDURE spProducts_GetPaged
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
    DECLARE @Offset INT = (@Page - 1) * @PageSize;

    SELECT p.ProductId INTO #PagedIds
    FROM Products p
    WHERE (@CategoryId IS NULL OR p.CategoryId = @CategoryId)
      AND (@Search IS NULL OR p.Name LIKE '%' + @Search + '%' OR p.Slug LIKE '%' + @Search + '%')
      AND (@OnlyActive = 0 OR p.IsActive = 1)
    ORDER BY p.ProductId DESC
    OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;

    --  Products
    SELECT p.*, c.Name as CategoryName,
           (SELECT TOP 1 ImageUrl FROM ProductImages WHERE ProductId = p.ProductId ORDER BY IsPrimary DESC) as PrimaryImageUrl
    FROM Products p 
    INNER JOIN Categories c ON p.CategoryId = c.CategoryId
    WHERE p.ProductId IN (SELECT ProductId FROM #PagedIds)
    ORDER BY p.ProductId DESC;

    --  Variants
    SELECT v.* FROM ProductVariants v WHERE v.ProductId IN (SELECT ProductId FROM #PagedIds);

    --  Attribute Values
    SELECT 
        vav.VariantId, 
        pa.Name AS AttributeName, 
        pav.Value AS AttributeValue
    FROM VariantAttributeValues vav
    INNER JOIN ProductAttributeValues pav ON vav.AttributeValueId = pav.AttributeValueId
    INNER JOIN ProductAttributes pa ON pav.AttributeId = pa.AttributeId
    INNER JOIN ProductVariants pv ON vav.VariantId = pv.VariantId
    WHERE pv.ProductId IN (SELECT ProductId FROM #PagedIds);

    SELECT COUNT(1) FROM Products 
    WHERE (@CategoryId IS NULL OR CategoryId = @CategoryId)
      AND (@Search IS NULL OR Name LIKE '%' + @Search + '%')
      AND (@OnlyActive = 0 OR IsActive = 1);
END
GO
