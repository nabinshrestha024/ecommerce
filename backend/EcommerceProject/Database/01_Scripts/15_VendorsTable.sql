USE EcommerceDB;
GO

CREATE TABLE Vendors (
    VendorID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(200) NOT NULL,
    ContactPerson NVARCHAR(100),
    Phone VARCHAR(20),
    Email VARCHAR(100),
    Address NVARCHAR(300),
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE()
);

PRINT 'Table Vendors created successfully.';
GO