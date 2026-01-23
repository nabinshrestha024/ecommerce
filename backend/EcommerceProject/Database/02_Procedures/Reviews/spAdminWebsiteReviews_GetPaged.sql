USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spAdminWebsiteReviews_GetPaged
(
    @Page INT,
    @PageSize INT,
    @SortOrder VARCHAR(4) = 'desc'
)
AS
BEGIN
    SET NOCOUNT ON;

    SET @SortOrder = LOWER(ISNULL(@SortOrder, 'desc'));
    IF (@SortOrder NOT IN ('asc', 'desc')) SET @SortOrder = 'desc';

    ;WITH ReviewsPaged AS
    (
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
    )
    SELECT *
    FROM ReviewsPaged
    ORDER BY
        CASE WHEN @SortOrder = 'asc'  THEN ReviewId END ASC,
        CASE WHEN @SortOrder = 'desc' THEN ReviewId END DESC,
        ReviewId DESC
    OFFSET (@Page - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;

    SELECT COUNT(1) FROM WebsiteReviews;
END
GO
