USE EcommerceDB;
GO

CREATE TABLE Vendors (
    VendorID        INT PRIMARY KEY IDENTITY(1,1),
    Name            VARCHAR(200) NOT NULL,
    ContactPerson   VARCHAR(100),
    Phone           VARCHAR(20),
    Email           VARCHAR(100),
    Address         VARCHAR(300),
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE()
);

PRINT 'Table Vendors created successfully.';
GO