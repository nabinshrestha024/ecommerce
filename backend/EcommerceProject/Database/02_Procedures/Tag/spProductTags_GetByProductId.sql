USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProductTags_GetByProductId
(
    @ProductId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        t.TagId,
        t.Name
    FROM ProductTags pt
    INNER JOIN Tags t ON pt.TagId = t.TagId
    WHERE pt.ProductId = @ProductId
    ORDER BY t.Name;
END
GO
