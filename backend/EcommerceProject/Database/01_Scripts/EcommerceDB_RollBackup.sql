USE master;
GO

-- 1. Force close all active connections
ALTER DATABASE [EcommerceDB] 
SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO

-- 2. Execute the restore
-- REMOVED THE DOUBLE QUOTES HERE:
RESTORE DATABASE [EcommerceDB] 
FROM DISK = 'C:\Users\NITRO\Desktop\Backups\EcommerceDB_Full_20251231_1450.bak' 
WITH REPLACE,
     STATS = 5; -- Provides progress updates every 5%
GO

-- 3. Bring the database back to normal mode
ALTER DATABASE [EcommerceDB] 
SET MULTI_USER;
GO