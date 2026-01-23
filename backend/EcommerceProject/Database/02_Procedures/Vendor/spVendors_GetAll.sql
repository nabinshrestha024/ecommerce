USE EcommerceDB;
GO
 
CREATE OR ALTER PROCEDURE spVendors_GetAll
    @IsActive   BIT         = NULL,
    @Page       INT         = 1,
    @PageSize   INT         = 10,
    @SortOrder  VARCHAR(20) = 'asc'
AS
BEGIN
    SET NOCOUNT ON;
 
    -- 🔹 Defensive defaults
    IF @Page < 1 SET @Page = 1;
    IF @PageSize < 1 SET @PageSize = 10;
 
    -- 🔹 Normalize sort direction
    DECLARE @OrderDir NVARCHAR(4);
    SET @OrderDir = CASE 
                        WHEN LOWER(@SortOrder) LIKE 'desc%' THEN 'DESC'
                        ELSE 'ASC'
                    END
 
    -- 🔹 Total count
    DECLARE @TotalCount INT
    SELECT @TotalCount = COUNT(*)
    FROM Vendors
    WHERE (@IsActive IS NULL OR IsActive = @IsActive)
 
    -- 🔹 Pagination
    DECLARE @Offset INT = (@Page - 1) * @PageSize
 
    -- 🔹 Dynamic SQL (ORDER BY only)
    DECLARE @sql NVARCHAR(MAX)
 
    SET @sql = N'
    SELECT
        VendorId,
        Name,
        ContactPerson,
        Phone,
        Email,
        Address,
        IsActive,
        CreatedAt,
        @TotalCount AS TotalCount
    FROM Vendors
    WHERE (@IsActive IS NULL OR IsActive = @IsActive)
    ORDER BY VendorId ' + @OrderDir + N'
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY;
    '
 
    EXEC sp_executesql
        @sql,
        N'@IsActive BIT, @Offset INT, @PageSize INT, @TotalCount INT',
        @IsActive = @IsActive,
        @Offset = @Offset,
        @PageSize = @PageSize,
        @TotalCount = @TotalCount
END
GO