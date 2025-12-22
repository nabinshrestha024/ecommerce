USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spProducts_GetBySlugOrId
(
    @SlugOrId VARCHAR(200),
    @OnlyActive BIT = 1
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @Id INT = TRY_CONVERT(INT, @SlugOrId);

    SELECT TOP 1
        p.ProductId,
        p.CategoryId,
        p.Name,
        p.Slug,
        p.Description,
        p.ShortDescription,
        p.Price,
        p.StockQuantity,
        p.SKU,
        p.IsActive,
        p.CreatedAt,
        p.UpdatedAt
    FROM Products p
    WHERE
        (
            (@Id IS NOT NULL AND p.ProductId = @Id)
            OR (p.Slug = @SlugOrId)
        )
        AND (@OnlyActive = 0 OR p.IsActive = 1);

   
    SELECT
        pi.ProductImageId,
        pi.ProductId,
        pi.ImageUrl,
        pi.IsPrimary,
        pi.SortOrder,
        pi.CreatedAt
    FROM ProductImages pi
    WHERE pi.ProductId = ISNULL(@Id, (SELECT TOP 1 ProductId FROM Products WHERE Slug = @SlugOrId))
    ORDER BY pi.IsPrimary DESC, pi.SortOrder ASC, pi.ProductImageId ASC;
END
GO
