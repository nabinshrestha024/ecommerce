USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spBanners_GetById
    @BannerId   INT
AS
BEGIN
    SELECT *
    FROM Banners
    WHERE BannerId = @BannerId;
END
GO

PRINT 'Stored Procedure spBanners_GetById created or altered successfully.';