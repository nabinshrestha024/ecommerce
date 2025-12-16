USE [EcommerceDB];
GO
IF OBJECT_ID(N'dbo.Notifications', N'U') IS NOT NULL
    DROP TABLE dbo.Notifications;
GO
CREATE TABLE dbo.Notifications (
NotificationId      BIGINT IDENTITY(1,1) PRIMARY KEY,
UserId              INT NULL,
Title               VARCHAR(250) NOT NULL,
Message             VARCHAR(2000) NULL,
IsRead              BIT NOT NULL DEFAULT 0,
Type                VARCHAR(100) NULL, -- 'Info','Warning','Alert'
CreatedAt           DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
CONSTRAINT FK_Notifications_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE
);
CREATE INDEX IX_Notifications_UserId ON dbo.Notifications(UserId);
GO
PRINT 'Table dbo.Notifications created successfully.';
GO

IF OBJECT_ID(N'dbo.AppLogs', N'U') IS NOT NULL
    DROP TABLE dbo.AppLogs;
GO
CREATE TABLE dbo.AppLogs (
AppLogId    BIGINT IDENTITY(1,1) PRIMARY KEY,
LogLevel    VARCHAR(20)  NOT NULL,
Message     VARCHAR(MAX) NOT NULL,
Exception   VARCHAR(MAX) NULL,
Source      VARCHAR(200) NULL,
CreatedAt   DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
);
GO
PRINT 'Table dbo.AppLogs created successfully.';
GO

IF OBJECT_ID(N'dbo.AuditLogs', N'U') IS NOT NULL
    DROP TABLE dbo.AuditLogs;
GO
CREATE TABLE dbo.AuditLogs (
AuditLogId  BIGINT IDENTITY(1,1) PRIMARY KEY,
TableName   VARCHAR(256) NOT NULL,
Operation   VARCHAR(20) NOT NULL,
KeyValues   VARCHAR(MAX) NULL,
OldValues   VARCHAR(MAX) NULL,
NewValues   VARCHAR(MAX) NULL,
ChangedBy   VARCHAR(200) NULL,
ChangedAt   DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
);
GO