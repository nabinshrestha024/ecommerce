USE [EcommerceDB];
GO

IF OBJECT_ID(N'catalog.Categories', N'U') IS NOT NULL
	DROP TABLE catalog.Categories;
GO

CREATE TABLE catalog.Categories (
    CategoryId          INT IDENTITY(1,1) PRIMARY KEY,
    ParentCategoryId    INT NULL,
    Name                VARCHAR(300) NOT NULL,
    Slug                VARCHAR(300) NULL,
    CategoryImage       VARCHAR(500) NULL,
    Description         VARCHAR(1000) NULL,
    IsFeatured          BIT NOT NULL DEFAULT 0,
    DisplayOrder        INT DEFAULT 0,
    SortOrder           INT DEFAULT 0, 
    IsActive            BIT NOT NULL DEFAULT 1,
    CreatedAt           DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Categories_Parent FOREIGN KEY (ParentCategoryId) REFERENCES catalog.Categories(CategoryId)
);
CREATE INDEX IX_Categories_Name ON catalog.Categories(Name);
GO

PRINT 'Table catalog.Categories created successfully.';
GO