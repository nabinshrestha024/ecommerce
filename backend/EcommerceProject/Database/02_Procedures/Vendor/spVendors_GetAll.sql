USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spVendors_GetAll
    @IsActive BIT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        VendorId,
        Name,
        ContactPerson,
        Phone,
        Email,
        Address,
        IsActive,
        CreatedAt
    FROM Vendors
    WHERE (@IsActive IS NULL OR IsActive = @IsActive)
    ORDER BY Name;
END
GO

PRINT 'Procedure spVendors_GetAll created successfully.';
GO