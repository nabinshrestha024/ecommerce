USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spBanners_CreateBanner
    @Title          VARCHAR(200),
    @Description    VARCHAR(1000),
    @RedirectUrl    VARCHAR(500) = NULL,
    @SortOrder      INT,
    @IsActive       BIT,
    @ImageUrl       VARCHAR(500)
AS
BEGIN
    INSERT INTO Banners
    (
        Title,
        Description,
        RedirectUrl,
        SortOrder,
        IsActive,
        ImageUrl,
        CreatedAt
    )
    VALUES
    (
        @Title,
        @Description,
        @RedirectUrl,
        @SortOrder,
        @IsActive,
        @ImageUrl,
        GETUTCDATE()
    );

    SELECT CAST(SCOPE_IDENTITY() AS INT);
END
GO

PRINT 'Stored Procedure spBanners_CreateBanner created or altered successfully.';