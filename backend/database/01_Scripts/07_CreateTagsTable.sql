USE [EcommerceDB];
GO

IF OBJECT_ID(N'catalog.Tags', N'U') IS NOT NULL
	DROP TABLE catalog.Tags;
GO

CREATE TABLE catalog.Tags (
    TagId      INT IDENTITY(1,1) PRIMARY KEY,
    Name       VARCHAR(300) NOT NULL UNIQUE,
    Slug       VARCHAR(300) NULL
);
GO

PRINT 'Table catalog.Tags created successfully.';
GO