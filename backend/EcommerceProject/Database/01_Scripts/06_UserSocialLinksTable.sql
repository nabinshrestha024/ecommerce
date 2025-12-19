USE [EcommerceDB];
GO

CREATE TABLE UserSocialLinks (
    SocialLinkId    INT IDENTITY(1,1) PRIMARY KEY,
    UserId          INT NOT NULL,
    Platform        VARCHAR(50) NOT NULL,
    ProfileUrl      VARCHAR(300) NOT NULL,
    CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
);
PRINT 'Table UserSocialLinks created.';
GO