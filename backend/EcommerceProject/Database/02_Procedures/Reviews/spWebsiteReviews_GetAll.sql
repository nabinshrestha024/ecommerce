USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spWebsiteReviews_GetAll
AS
BEGIN
    SELECT
        WebsiteReviewId AS ReviewId,
        UserId,
        Title,
        Content,
        Rating,
        CreatedAt
    FROM WebsiteReviews
    ORDER BY CreatedAt DESC;
END
GO
