USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'Users', N'U') IS NOT NULL
	DROP TABLE Users;
GO

CREATE TABLE Users (
    UserId           INT IDENTITY(1,1) PRIMARY KEY,
    Email            VARCHAR(320) NOT NULL UNIQUE,       
    PasswordHash     VARCHAR(MAX) NULL,                   
    FullName        VARCHAR(200) NOT NULL,
    Phone           VARCHAR(20) NULL,
    Role            SMALLINT NOT NULL DEFAULT 0, -- 1: Admin, 0: Customer, 2:Supplier
    Status          SMALLINT NOT NULL DEFAULT 1,   -- 1: Active, 0: Inactive, 2: Banned  
    ProfileImageUrl  VARCHAR(1024) NULL,
    DateOfBirth      DATE NULL,
    Gender           VARCHAR(20) NULL,
    IsActive         BIT NOT NULL DEFAULT 1,
    RoleId           TINYINT NOT NULL DEFAULT 1,           
    CreatedAt        DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt        DATETIME2 NULL,
    DeletedAt        DATETIME2 NULL,
);
CREATE INDEX IX_Users_Email ON Users(Email);
GO

PRINT 'Table Users created successfully.';
GO