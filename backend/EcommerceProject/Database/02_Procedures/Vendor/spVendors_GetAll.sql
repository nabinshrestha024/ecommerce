USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spVendors_GetAll
    @IsActive BIT = NULL,
    @Page INT = 1,
    @PageSize INT = 10
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @TotalCount INT;
    SELECT @TotalCount = COUNT(*) FROM Vendors
    WHERE (@IsActive IS NULL OR IsActive = @IsActive);
    
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
    ORDER BY Name
    OFFSET (@Page -1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END
GO

PRINT 'Procedure spVendors_GetAll created successfully.';
GO