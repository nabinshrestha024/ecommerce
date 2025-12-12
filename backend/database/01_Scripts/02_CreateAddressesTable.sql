USE [EcommerceDB];
GO

IF OBJECT_ID(N'dbo.Addresses', N'U') IS NOT NULL
	DROP TABLE dbo.Addresses;
GO

CREATE TABLE dbo.Addresses (
    AddressId    INT IDENTITY(1,1) PRIMARY KEY,
    UserId       INT NOT NULL,
    Label        VARCHAR(50) NULL,   -- 'Home', 'Work'
    City         VARCHAR(200) NOT NULL,
    State        VARCHAR(200) NULL,
    PostalCode   VARCHAR(50) NULL,
    Country      VARCHAR(100) NOT NULL,
    IsDefault    BIT NOT NULL DEFAULT 0,
    CreatedAt    DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt    DATETIME2 NULL,
    CONSTRAINT FK_Addresses_Users FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE
);
CREATE INDEX IX_Addresses_UserId ON dbo.Addresses(UserId);
GO

PRINT 'dbo.Addresses table created successfully.';
GO

