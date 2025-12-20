USE [EcommerceDB];
GO
CREATE TABLE SystemSettings (
    [Key]           VARCHAR(100) PRIMARY KEY,
    [Value]         VARCHAR(1000) NULL,
    UpdatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedBy       VARCHAR(100) NULL
);
PRINT 'Table SystemSettings created.';
GO
