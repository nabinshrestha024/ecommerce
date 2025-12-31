USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spWebsiteReviews_DeleteByUser
    @WebsiteReviewId BIGINT,
    @UserId INT
AS
BEGIN
    UPDATE WebsiteReviews
    SET IsDeleted = 1,
        DeletedAt = SYSUTCDATETIME()
    WHERE WebsiteReviewId = @WebsiteReviewId
      AND UserId = @UserId
      AND IsDeleted = 0;
END
GO
