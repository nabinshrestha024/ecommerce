USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'Carts', N'U') IS NOT NULL
	DROP TABLE Carts;
GO

CREATE TABLE Carts (
    CartId BIGINT IDENTITY(1,1) PRIMARY KEY,
    UserId BIGINT NULL REFERENCES Users(UserId) ON DELETE CASCADE,
    SessionId VARCHAR(200),
    ExpiresAt DATETIME2 NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

PRINT 'Carts table created successfully.';
GO
