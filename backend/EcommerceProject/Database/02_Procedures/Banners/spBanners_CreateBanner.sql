USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spBanners_CreateBanner
    @Title            VARCHAR(200),
    @Description      VARCHAR(300),
    @ImageUrl         VARCHAR(500),
    @RedirectUrl      VARCHAR(500) = NULL,
    @SliderCode       VARCHAR(50) = 'home',
    @SortOrder        INT,
    @IsActive         BIT = 1,
    @StartAt          DATETIME2 = NULL,
    @EndAt            DATETIME2 = NULL
AS
BEGIN
    INSERT INTO Banners
    VALUES
    (
        @Title,
        @Description,
        @ImageUrl,
        @RedirectUrl,
        @SliderCode,
        @SortOrder,
        @IsActive,
        @StartAt,
        @EndAt,
        SYSDATETIME(),
        NULL    
    );

    SELECT SCOPE_IDENTITY() AS BannerId;
END;
GO

PRINT 'Stored Procedure spBanners_CreateBanner created or altered successfully.';