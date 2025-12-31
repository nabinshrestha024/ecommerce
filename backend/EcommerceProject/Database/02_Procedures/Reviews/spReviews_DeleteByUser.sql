USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spReviews_DeleteByUser
    @ReviewId BIGINT,
    @UserId INT
AS
BEGIN
    UPDATE Reviews
    SET IsDeleted = 1,
        DeletedAt = SYSUTCDATETIME()
    WHERE ReviewId = @ReviewId
      AND UserId = @UserId
      AND IsDeleted = 0;

END
GO

