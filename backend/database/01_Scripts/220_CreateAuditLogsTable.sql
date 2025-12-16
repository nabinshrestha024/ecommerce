USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'AuditLogs', N'U') IS NOT NULL
    DROP TABLE AuditLogs;
GO

CREATE TABLE AuditLogs (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    UserId BIGINT,
    EntityType VARCHAR(300),
    EntityId BIGINT,
    Action VARCHAR(200),
    Diff VARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);

PRINT 'AuditLogs table created successfully.';
GO