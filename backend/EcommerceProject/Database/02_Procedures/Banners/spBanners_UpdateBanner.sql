USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spBanners_UpdateBanner
    @BannerId        INT,
    @Title           VARCHAR(200),
    @Description     VARCHAR(300),
    @ImageUrl        VARCHAR(500),
    @RedirectUrl     VARCHAR(500) = NULL,
    @SortOrder       INT,
    @IsActive        BIT = 1
AS
BEGIN
    UPDATE Banners
    SET
        Title       = @Title,
        Description = @Description,
        ImageUrl    = @ImageUrl,
        RedirectUrl = @RedirectUrl,
        SortOrder   = @SortOrder,
        IsActive    = @IsActive,
        UpdatedAt   = SYSDATETIME()
    WHERE BannerId = @BannerId;
END;
GO

PRINT 'Stored Procedure spBanners_UpdateBanner created or altered successfully.';