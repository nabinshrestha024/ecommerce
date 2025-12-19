USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spVendors_GetById
    @VendorId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        VendorID AS VendorId,
        Name,
        ContactPerson,
        Phone,
        Email,
        Address,
        IsActive,
        CreatedAt
    FROM Vendors
    WHERE VendorID = @VendorId;
END
GO

PRINT 'Procedure spVendors_GetById created successfully.';
GO