USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'Notifications', N'U') IS NOT NULL
	DROP TABLE Notifications;
GO

CREATE TABLE Notifications (
    NotificationId BIGINT IDENTITY(1,1) PRIMARY KEY,
    UserId BIGINT NOT NULL REFERENCES Users(UserId),
    Type VARCHAR(200),
    Channel VARCHAR(100),
    Payload VARCHAR(MAX),
    IsRead BIT DEFAULT 0,
    SentAt DATETIME2,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

PRINT 'Notifications table created successfully.';
GO