USE [EcommerceDB];
GO

CREATE TABLE Notifications (
    NotificationID      INT PRIMARY KEY IDENTITY(1,1),
    UserID              INT NULL,
    Title               VARCHAR(200) NOT NULL,
    Message             VARCHAR(500) NOT NULL,
    IsRead              BIT DEFAULT 0,
    CreatedAt           DATETIME DEFAULT GETDATE(),
    OrderID             INT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

PRINT 'Table Notifications created successfully.';
GO