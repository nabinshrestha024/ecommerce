USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spWebsiteReviews_DeleteByAdmin
    @WebsiteReviewId BIGINT
AS
BEGIN
    UPDATE WebsiteReviews
    SET IsDeleted = 1,
        DeletedAt = SYSUTCDATETIME()
    WHERE WebsiteReviewId = @WebsiteReviewId
      AND IsDeleted = 0;
END
GO
