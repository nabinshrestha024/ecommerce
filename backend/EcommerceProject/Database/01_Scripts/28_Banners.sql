USE EcommerceDB;
GO

CREATE TABLE Banners (
    BannerId        INT IDENTITY PRIMARY KEY,
    Title           VARCHAR(200) NOT NULL,
    Description     VARCHAR(300) NOT NULL,
    ImageUrl        VARCHAR(500) NOT NULL,
    RedirectUrl     VARCHAR(500) NULL,
    SliderCode      VARCHAR(50) NOT NULL DEFAULT 'home',
    SortOrder       INT NOT NULL,
    IsActive        BIT NOT NULL DEFAULT 1,
    StartAt         DATETIME2 NULL,
    EndAt           DATETIME2 NULL,
    CreatedAt       DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
    UpdatedAt       DATETIME2 NULL
);
GO

PRINT 'Table Banners created successfully.';
