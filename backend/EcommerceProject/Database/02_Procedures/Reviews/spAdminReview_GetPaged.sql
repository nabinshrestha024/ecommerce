USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spAdminReviews_GetPaged
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
            r.ReviewId,
            r.ProductId,
            r.UserId,
            u.FullName AS UserName,
            u.ProfileImageUrl AS UserImageUrl,
            r.Content,
            r.Rating,
            r.IsDeleted,
            r.CreatedAt
        FROM Reviews r
        LEFT JOIN Users u ON u.UserId = r.UserId
    )
    SELECT *
    FROM ReviewsPaged
    ORDER BY
        CASE WHEN @SortOrder = 'asc'  THEN ReviewId END ASC,
        CASE WHEN @SortOrder = 'desc' THEN ReviewId END DESC,
        ReviewId DESC
    OFFSET (@Page - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;

    SELECT COUNT(1) FROM Reviews;
END
GO
