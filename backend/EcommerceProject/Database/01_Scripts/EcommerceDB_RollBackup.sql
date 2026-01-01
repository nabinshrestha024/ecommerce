USE master;
GO

-- force close all active connections
ALTER DATABASE [EcommerceDB] 
SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO

-- execute the restore
-- replace '20251231_1351' with the actual timestamp on your file in C:\Backups
RESTORE DATABASE [EcommerceDB] 
FROM DISK = 'D:\C# Project\Backups\20251231_1504.bak'  -- change as required
WITH REPLACE;
GO

-- bring the database back to normal mode
ALTER DATABASE [EcommerceDB] 
SET MULTI_USER;
GO