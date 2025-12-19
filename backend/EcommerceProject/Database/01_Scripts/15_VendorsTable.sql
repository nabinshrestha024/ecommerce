USE EcommerceDB;
GO

CREATE TABLE Vendors (
    VendorId        INT IDENTITY(1,1) PRIMARY KEY,
    Name            VARCHAR(200) NOT NULL,
    ContactPerson   VARCHAR(100) NULL,
    Phone           VARCHAR(20) NULL,
    Email           VARCHAR(100) NULL,
    Address         VARCHAR(300) NULL,
    IsActive        BIT NOT NULL DEFAULT 1,
    CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
);

PRINT 'Table Vendors created.';
GO