CREATE TABLE LoginRateLimits
(
    Id INT IDENTITY PRIMARY KEY,
    Email VARCHAR(200) NOT NULL,
    IpAddress VARCHAR(50) NOT NULL,
    FailedAttempts INT NOT NULL DEFAULT 0,
    LockedUntilUtc DATETIME2 NULL,
    LastAttemptUtc DATETIME2 NOT NULL,
    CONSTRAINT UQ_LoginRate UNIQUE (Email, IpAddress)
);
