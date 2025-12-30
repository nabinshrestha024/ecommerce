USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spAdminReviews_GetPaged
    @Page INT,
    @PageSize INT
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH ReviewsPaged AS (
        SELECT
            r.ReviewId,
            r.ProductId,
            r.UserId,
            r.Title,
            r.Content,
            r.Rating,
            r.IsDeleted,
            r.CreatedAt
        FROM Reviews r
        ORDER BY r.CreatedAt DESC
        OFFSET (@Page - 1) * @PageSize ROWS
        FETCH NEXT @PageSize ROWS ONLY
    )
    SELECT * FROM ReviewsPaged;

    SELECT COUNT(1) FROM Reviews;
END
GO
