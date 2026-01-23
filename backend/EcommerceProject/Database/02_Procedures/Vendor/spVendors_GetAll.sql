CREATE OR ALTER PROCEDURE spVendors_GetAll
    @IsActive BIT = NULL,
    @Page INT = 1,
    @PageSize INT = 10,
    @SortOrder VARCHAR(20) = 'ascending'
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalCount INT;
    SELECT @TotalCount = COUNT(*) 
    FROM Vendors
    WHERE (@IsActive IS NULL OR IsActive = @IsActive);

    DECLARE @Offset INT = (@Page - 1) * @PageSize;

    DECLARE @sql VARCHAR(MAX);
    SET @sql = N'
    SELECT 
        VendorId, Name, ContactPerson, Phone, Email, Address, IsActive, CreatedAt, @TotalCount AS TotalCount
    FROM Vendors
    WHERE (@IsActive IS NULL OR IsActive = @IsActive)
    ORDER BY VendorId ' + (CASE WHEN LOWER(@SortOrder) LIKE 'desc%' THEN 'DESC' ELSE 'ASC' END) + N'
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY;'

    EXEC sp_executesql @sql, 
        N'@IsActive BIT, @Offset INT, @PageSize INT, @TotalCount INT', 
        @IsActive, @Offset, @PageSize, @TotalCount
END
GO

PRINT 'Stored Procedure spVendors_GetAll created or altered successfully.';

