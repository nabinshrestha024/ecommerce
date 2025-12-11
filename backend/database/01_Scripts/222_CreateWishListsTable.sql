USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'Wishlists', N'U') IS NOT NULL
    DROP TABLE Wishlists;
GO

CREATE TABLE Wishlists (
    WishListId BIGINT IDENTITY(1,1) PRIMARY KEY,
    UserId BIGINT NOT NULL REFERENCES Users(UserId) ON DELETE CASCADE,
    Name VARCHAR(300) DEFAULT 'Default',
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

PRINT 'Wishlists table created successfully.';
GO