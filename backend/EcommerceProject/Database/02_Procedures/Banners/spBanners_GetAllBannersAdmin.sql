USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spBanners_GetAllBannersAdmin
AS
BEGIN
    SET NOCOUNT ON;
    SELECT 
        BannerId, 
        Title, 
        Description, 
        ImageUrl, 
        RedirectUrl, 
        SortOrder, 
        IsActive
    FROM Banners
    ORDER BY SortOrder ASC;
END
GO

PRINT 'Stored Procedure spBanners_GetAllBannersAdmin created successfully.';