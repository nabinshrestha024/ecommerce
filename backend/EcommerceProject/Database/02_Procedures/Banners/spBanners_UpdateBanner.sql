USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spBanners_UpdateBanner
    @BannerId       INT,
    @Title          VARCHAR(200),
    @Description    VARCHAR(1000),
    @RedirectUrl    VARCHAR(500) = NULL,
    @SortOrder      INT,
    @IsActive       BIT
AS
BEGIN
    UPDATE Banners
    SET
        Title = @Title,
        Description = @Description,
        RedirectUrl = @RedirectUrl,
        SortOrder = @SortOrder,
        IsActive = @IsActive,
        UpdatedAt = GETUTCDATE()
    WHERE BannerId = @BannerId;
END

PRINT 'Stored Procedure spBanners_UpdateBanner created or altered successfully.';