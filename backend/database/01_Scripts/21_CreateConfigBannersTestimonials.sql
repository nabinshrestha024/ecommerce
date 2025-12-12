USE [EcommerceDB];
GO
IF OBJECT_ID(N'dbo.Config', N'U') IS NOT NULL
    DROP TABLE dbo.Config;
GO
CREATE TABLE dbo.Config (
ConfigKey       VARCHAR(200) PRIMARY KEY,
ConfigValue     VARCHAR(MAX) NULL,
Description     VARCHAR(1000) NULL,
UpdatedAt       DATETIME2(3) NULL
);
GO
PRINT 'Table dbo.Config created successfully.';
GO

IF OBJECT_ID(N'catalog.Banners', N'U') IS NOT NULL
    DROP TABLE catalog.Banners;
GO
CREATE TABLE catalog.Banners (
BannerId            INT IDENTITY(1,1) PRIMARY KEY,
Title               VARCHAR(250) NULL,
ImageUrl            VARCHAR(1024) NULL,
LinkUrl             VARCHAR(1024) NULL, -- URL to navigate when banner is clicked
DisplayOrder        INT NOT NULL DEFAULT 0,
IsActive            BIT NOT NULL DEFAULT 1
);
GO
PRINT 'Table catalog.Banners created successfully.';
GO

IF OBJECT_ID(N'catalog.Testimonials', N'U') IS NOT NULL
    DROP TABLE catalog.Testimonials;
GO
CREATE TABLE catalog.Testimonials (
TestimonialId       INT IDENTITY(1,1) PRIMARY KEY,
CustomerName        VARCHAR(200) NOT NULL,
CustomerImageUrl    VARCHAR(1024) NULL,
Email            VARCHAR(320) NULL,
Phone               VARCHAR(50) NULL,
Content         VARCHAR(2000) NOT NULL,
Rating          TINYINT NULL,
IsActive        BIT NOT NULL DEFAULT 1,
CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
);
GO
PRINT 'Table catalog.Testimonials created successfully.';
GO