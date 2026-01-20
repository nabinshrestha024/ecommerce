USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spBanners_UpdateImage
    @BannerId       INT,
    @ImageUrl       VARCHAR(500)
AS
BEGIN
    UPDATE Banners
    SET ImageUrl = @ImageUrl,
        UpdatedAt = GETUTCDATE()
    WHERE BannerId = @BannerId;
END
GO

PRINT 'Stored Procedure spBanners_UpdateImage created or altered successfully.';