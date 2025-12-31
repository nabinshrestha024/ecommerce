USE [EcommerceDB];
GO

CREATE TABLE WebsiteReviews (
    WebsiteReviewId INT IDENTITY(1,1) PRIMARY KEY,
    UserId          INT NULL,
    Title           VARCHAR(250) NULL,
    Content         VARCHAR(4000) NULL,
    Rating          TINYINT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    IsDeleted       BIT NOT NULL DEFAULT 0,
    DeletedAt       DATETIME(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);


PRINT 'Table WebsiteReviews created.';
GO
