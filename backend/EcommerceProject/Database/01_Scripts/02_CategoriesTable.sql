USE [EcommerceDB];
GO

CREATE TABLE Categories (
    CategoryId          INT IDENTITY(1,1) PRIMARY KEY,
    Name                VARCHAR(300) NOT NULL,
    Slug                VARCHAR(300) NOT NULL UNIQUE,
    CategoryImageURL    VARCHAR(500) NULL,
    Description         VARCHAR(1000) NULL,
    IsFeatured          BIT NOT NULL DEFAULT 0,
    SortOrder           INT DEFAULT 0,
    IsActive            BIT NOT NULL DEFAULT 1,
    CreatedAt           DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
);
PRINT 'Table Categories created.';
GO