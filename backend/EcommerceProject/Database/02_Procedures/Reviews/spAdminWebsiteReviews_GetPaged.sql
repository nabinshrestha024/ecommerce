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
            wr.Title,
            wr.Content,
            wr.Rating,
            wr.IsDeleted,
            wr.CreatedAt
        FROM WebsiteReviews wr
        ORDER BY wr.CreatedAt DESC
        OFFSET (@Page - 1) * @PageSize ROWS
        FETCH NEXT @PageSize ROWS ONLY
    )
    SELECT * FROM ReviewsPaged;

    SELECT COUNT(1) FROM WebsiteReviews;
END
GO
