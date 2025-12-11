USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'Suppliers', N'U') IS NOT NULL
	DROP TABLE Suppliers;
GO

CREATE TABLE Suppliers (
    SupplierId BIGINT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(300),
    Contact VARCHAR(MAX),
    Address VARCHAR(MAX),
    Notes VARCHAR(MAX)
);
GO

PRINT 'Suppliers table created successfully.';
GO