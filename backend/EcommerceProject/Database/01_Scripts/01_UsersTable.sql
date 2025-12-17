USE [EcommerceDB];
GO

CREATE TABLE Users (
    UserId           INT IDENTITY(1,1) PRIMARY KEY,
    Email            VARCHAR(320) NOT NULL UNIQUE,       
    PasswordHash     VARCHAR(MAX) NULL,                   
    Status           SMALLINT NOT NULL DEFAULT 1,   -- Active, Inactive, Banned  
    ProfileImageUrl  VARCHAR(1024) NULL,    
    Phone            VARCHAR(20) NULL,
    Address          VARCHAR(500) NULL,
    City             VARCHAR(200) NULL,
    Role             BIT NOT NULL DEFAULT 1, -- Admin = 0, Customer = 1
    IsActive         BIT NOT NULL DEFAULT 1,   
    CreatedAt        DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt        DATETIME2(3) NULL,
    DeletedAt        DATETIME2(3) NULL,
);

PRINT 'Table Users created successfully.';
GO