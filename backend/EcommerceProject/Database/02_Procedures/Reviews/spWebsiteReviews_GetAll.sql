USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spWebsiteReviews_GetAll
AS
BEGIN
    SELECT
        wr.WebsiteReviewId AS ReviewId,
        wr.UserId,
        u.FullName AS UserName,
        u.ProfileImageUrl As UserImageUrl,
        wr.Content,
        wr.Rating,
        wr.CreatedAt
    FROM WebsiteReviews wr
    LEFT JOIN Users u ON u.UserId = wr.UserId
        WHERE wr.IsDeleted = 0
        AND u.IsDeleted = 0 
    ORDER BY CreatedAt DESC;
END
GO
