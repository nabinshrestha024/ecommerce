-- Backup script for EcommerceDB

DECLARE @BackupFile NVARCHAR(500);
DECLARE @Timestamp NVARCHAR(50);

-- Format: YYYYMMDD_HHmm
SET @Timestamp = FORMAT(GETDATE(), 'yyyyMMdd_HHmm');
SET @BackupFile = 'C:\Backups\EcommerceDB_Full_' + @Timestamp + '.bak'; 

BACKUP DATABASE [EcommerceDB]
TO DISK = @BackupFile
WITH 
    FORMAT,         
    NAME = 'EcommerceDB-Full Backup',
    STATS = 10,     
    COMPRESSION;
GO