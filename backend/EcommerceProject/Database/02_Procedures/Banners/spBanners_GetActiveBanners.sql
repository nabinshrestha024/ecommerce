USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spBanners_GetActiveBanners
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        BannerId,
        Title,
        Description,
        ImageUrl,
        RedirectUrl,
        IsActive,
        SortOrder
    FROM Banners
    WHERE
        IsActive = 1
    ORDER BY SortOrder;
END;
GO

PRINT 'Stored Procedure spBanners_GetActiveBanners created or altered successfully.';
