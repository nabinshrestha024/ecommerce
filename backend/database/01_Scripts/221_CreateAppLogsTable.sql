USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'AppLogs', N'U') IS NOT NULL
    DROP TABLE AppLogs;
GO

CREATE TABLE AppLogs (  
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    Level VARCHAR(100),
    Message VARCHAR(MAX),
    Meta VARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

PRINT 'AppLogs table created successfully.';
GO