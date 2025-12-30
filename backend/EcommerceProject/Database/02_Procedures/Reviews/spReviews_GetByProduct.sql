USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spReviews_GetByProduct
    @ProductId INT
AS
BEGIN
    SELECT
        r.ReviewId,
        r.UserId,
        r.Title,
        r.Content,
        r.Rating,
        r.CreatedAt
    FROM Reviews r
    WHERE r.ProductId = @ProductId
    ORDER BY r.CreatedAt DESC;
END
GO
