USE EcommerceDB;
GO

CREATE TABLE Banners (
    BannerId    INT IDENTITY PRIMARY KEY,
    Title       VARCHAR(200) NOT NULL,
    Description VARCHAR(300) NOT NULL,
    ImageUrl    VARCHAR(500) NULL,
    RedirectUrl VARCHAR(500) NULL,
    SortOrder   INT NOT NULL DEFAULT 0,
    IsActive    BIT NOT NULL DEFAULT 1,
    CreatedAt   DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt   DATETIME2 NULL
);
GO

PRINT 'Table Banners created successfully.';
