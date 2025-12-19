USE [EcommerceDB];
GO

CREATE TABLE UserProfiles (
    UserId              INT PRIMARY KEY,
    DateOfBirth         DATE NULL,
    Gender              VARCHAR(20) NULL,
    Bio                 VARCHAR(500) NULL,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
);
PRINT 'Table UserProfiles created.';
GO

