USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spReviews_DeleteByAdmin
    @ReviewId BIGINT
AS
BEGIN
    UPDATE Reviews
    SET IsDeleted = 1,
        DeletedAt = SYSUTCDATETIME()
    WHERE ReviewId = @ReviewId;

   
END
GO
