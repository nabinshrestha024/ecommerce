USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spBanners_GetAllBannersAdmin
    @SortOrder NVARCHAR(20) = 'ascending'
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @sql NVARCHAR(MAX);
    
    SET @sql = N'SELECT 
        BannerId, 
        Title, 
        Description, 
        ImageUrl, 
        RedirectUrl, 
        SortOrder, 
        IsActive
    FROM Banners
    ORDER BY BannerId ' + (CASE WHEN LOWER(@SortOrder) LIKE 'desc%' THEN 'DESC' ELSE 'ASC' END)

    EXEC sp_executesql @sql
END
GO

PRINT 'Stored Procedure spBanners_GetAllBannersAdmin created successfully.';