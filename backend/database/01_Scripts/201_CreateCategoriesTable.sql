USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'Categories', N'U') IS NOT NULL
	DROP TABLE Categories;
GO

CREATE TABLE Categories (
    CategoryId    INT IDENTITY(1,1) PRIMARY KEY,
    CategoryName  VARCHAR(150) NOT NULL UNIQUE,
    Slug          VARCHAR(200) NULL,
    SortOrder     INT DEFAULT 0, 
    Description   VARCHAR(1000) NULL,
    IsActive      BIT NOT NULL DEFAULT 1,
    CreatedAt     DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt     DATETIME2 NULL
);
GO

PRINT 'Table catalog.Categories created successfully.';
GO