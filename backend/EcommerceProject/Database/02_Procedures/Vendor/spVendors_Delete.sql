USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spVendors_Delete
    @VendorId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Vendors 
    SET IsActive = 0 
    WHERE VendorId = @VendorId;
    
    SELECT @@ROWCOUNT AS RowsAffected;
END
GO

PRINT 'Procedure spVendors_Delete created successfully.';
GO