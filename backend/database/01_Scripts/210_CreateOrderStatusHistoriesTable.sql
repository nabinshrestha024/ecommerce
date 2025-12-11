USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'OrderStatusHistories', N'U') IS NOT NULL
	DROP TABLE OrderStatusHistories;
GO

CREATE TABLE OrderStatusHistories (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    OrderId BIGINT NOT NULL REFERENCES Orders(OrderId) ON DELETE CASCADE,
    FromStatus VARCHAR(100),
    ToStatus VARCHAR(100),
    ChangedBy BIGINT NULL REFERENCES Users(UserId),
    Reason VARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

PRINT 'OrderStatusHistories table created successfully.';
GO
