IF NOT EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'EcommerceDB')
BEGIN
    CREATE DATABASE [EcommerceDB]; 
    PRINT 'Database EcommerceDB created successfully.';
END
ELSE
BEGIN
    PRINT 'Database EcommerceDB already exists.';
END
GO

