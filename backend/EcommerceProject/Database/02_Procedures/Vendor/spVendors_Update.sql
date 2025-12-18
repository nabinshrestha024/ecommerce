USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spVendors_Update
    @VendorId INT,
    @Name VARCHAR(200) = NULL,
    @ContactPerson VARCHAR(100) = NULL,
    @Phone VARCHAR(20) = NULL,
    @Email VARCHAR(100) = NULL,
    @Address VARCHAR(300) = NULL,
    @IsActive BIT = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        UPDATE Vendors 
        SET 
            Name = ISNULL(@Name, Name),
            ContactPerson = ISNULL(@ContactPerson, ContactPerson),
            Phone = ISNULL(@Phone, Phone),
            Email = ISNULL(@Email, Email),
            Address = ISNULL(@Address, Address),
            IsActive = ISNULL(@IsActive, IsActive)
        WHERE VendorID = @VendorId;
        
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
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

PRINT 'Procedure spVendors_Update created successfully.';
GO