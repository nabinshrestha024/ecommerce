USE [EcommerceDB];
GO

CREATE OR ALTER PROCEDURE spVendors_Create
    @Name VARCHAR(200),
    @ContactPerson VARCHAR(100) = NULL,
    @Phone VARCHAR(20) = NULL,
    @Email VARCHAR(100) = NULL,
    @Address VARCHAR(300) = NULL
AS
BEGIN
    SET NOCOUNT ON;
    
    BEGIN TRY
        BEGIN TRANSACTION;
        
        INSERT INTO Vendors (Name, ContactPerson, Phone, Email, Address, IsActive, CreatedAt)
        VALUES (@Name, @ContactPerson, @Phone, @Email, @Address, 1, GETDATE());
        
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
        WHERE VendorID = SCOPE_IDENTITY();
        
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END
GO

PRINT 'Procedure spVendors_Create created successfully.';
GO