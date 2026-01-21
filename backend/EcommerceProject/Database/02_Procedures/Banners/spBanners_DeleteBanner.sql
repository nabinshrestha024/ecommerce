USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spBanners_DeleteBanner
    @BannerId INT
AS
BEGIN
    DELETE FROM Banners
    WHERE BannerId = @BannerId;
END
GO

PRINT 'Stored Procedure spBanners_DeleteBanner created or altered successfully.';