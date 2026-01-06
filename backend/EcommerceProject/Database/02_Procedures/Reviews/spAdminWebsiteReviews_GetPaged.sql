USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spAdminWebsiteReviews_GetPaged
    @Page INT,
    @PageSize INT
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH ReviewsPaged AS (
        SELECT
            wr.WebsiteReviewId AS ReviewId,
            wr.UserId,
            u.FullName        AS UserName,
            u.ProfileImageUrl AS UserImageUrl,
            wr.Content,
            wr.Rating,
            wr.IsDeleted,
            wr.CreatedAt
        FROM WebsiteReviews wr
        LEFT JOIN Users u ON u.UserId = wr.UserId
        ORDER BY wr.CreatedAt DESC
        OFFSET (@Page - 1) * @PageSize ROWS
        FETCH NEXT @PageSize ROWS ONLY
    )
    SELECT * FROM ReviewsPaged;

    SELECT COUNT(1) FROM WebsiteReviews;
END
GO
