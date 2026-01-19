USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spBanners_GetActiveBanners
    @SliderCode VARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        BannerId,
        Title,
        Description,
        ImageUrl,
        RedirectUrl,
        SortOrder
    FROM Banners
    WHERE
        IsActive = 1
        AND SliderCode = @SliderCode
        AND (StartAt IS NULL OR StartAt <= SYSDATETIME())
        AND (EndAt IS NULL OR EndAt >= SYSDATETIME())
    ORDER BY SortOrder;
END;
GO

PRINT 'Stored Procedure spBanners_GetActiveBanners created or altered successfully.';
