USE master;
GO

-- 1. Force close all active connections
ALTER DATABASE [EcommerceDB] 
SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
GO

-- 2. Execute the restore
-- REMOVED THE DOUBLE QUOTES HERE:
RESTORE DATABASE [EcommerceDB] 
FROM DISK = 'D:\C# Project\Backups\20251231_1504.bak'  -- change as required
WITH REPLACE;
GO

-- 3. Bring the database back to normal mode
ALTER DATABASE [EcommerceDB] 
SET MULTI_USER;
GO