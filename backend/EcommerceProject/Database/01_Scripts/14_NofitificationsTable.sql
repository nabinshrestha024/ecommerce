USE [EcommerceDB];
GO

CREATE TABLE Notifications (
    NotificationId  INT IDENTITY(1,1) PRIMARY KEY,
    UserId          INT NULL,
    Title           VARCHAR(200) NOT NULL,
    Message         VARCHAR(500) NOT NULL,
    IsRead          BIT NOT NULL DEFAULT 0,
    CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    OrderId         INT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE SET NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE SET NULL
);

PRINT 'Table Notifications created.';
GO