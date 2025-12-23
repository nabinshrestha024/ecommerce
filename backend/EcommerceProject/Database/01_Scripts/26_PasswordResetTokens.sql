USE [EcommerceDB];
GO

CREATE TABLE PasswordResetToken
(
    UserId INT,
    Token VARCHAR(500),
    Expiry DATETIME,
    PRIMARY KEY(Token)
);

PRINT " Table PasswordResetToken created successfully."
GO