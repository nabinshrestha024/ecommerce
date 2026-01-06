USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spReviews_GetByProduct
    @ProductId INT
AS
BEGIN
    SELECT
        r.ReviewId,
        r.UserId,
        u.FullName AS UserName,
        u.ProfileImageUrl As UserImageUrl,
        r.Content,
        r.Rating,
        r.CreatedAt
    FROM Reviews r
    LEFT JOIN Users u ON u.UserId =r.UserId
    WHERE r.ProductId = @ProductId
    ORDER BY r.CreatedAt DESC;
END
GO
