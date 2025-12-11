USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'Discounts', N'U') IS NOT NULL
    DROP TABLE Discounts;
GO

CREATE TABLE Discounts (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    Name VARCHAR(300),
    Type VARCHAR(200),
    Config VARCHAR(MAX),
    ActiveFrom DATETIME2,
    ActiveTo DATETIME2,
    UsageLimit INT,
    PerUserLimit INT
);

PRINT 'Discounts table created successfully.';
GO

