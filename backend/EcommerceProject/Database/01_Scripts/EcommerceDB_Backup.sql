-- Backup script for EcommerceDB

DECLARE @BackupFile NVARCHAR(500);
DECLARE @Timestamp NVARCHAR(50);

-- Format: YYYYMMDD_HHmm
SET @Timestamp = FORMAT(GETDATE(), 'yyyyMMdd_HHmm');
SET @BackupFile = 'D:\C# Project\Backups' + @Timestamp + '.bak'; 

BACKUP DATABASE [EcommerceDB]
TO DISK = @BackupFile
WITH 
    FORMAT,         
    NAME = 'EcommerceDB-Full Backup',
    STATS = 10,     
    COMPRESSION;
GO