-- check if the database already exists before creating
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

USE [EcommerceDB];
GO
-- create schemas to organize tables
IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = 'catalog') EXEC('CREATE SCHEMA catalog');
IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = 'sales') EXEC('CREATE SCHEMA sales');
IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = 'procure') EXEC('CREATE SCHEMA procure');
IF NOT EXISTS (SELECT 1 FROM sys.schemas WHERE name = 'security') EXEC('CREATE SCHEMA security');
GO
