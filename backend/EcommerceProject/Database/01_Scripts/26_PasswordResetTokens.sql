CREATE TABLE PasswordResetToken
(
    UserId INT,
    Token VARCHAR(500),
    Expiry DATETIME,
    PRIMARY KEY(Token)
);
