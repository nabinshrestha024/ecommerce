USE [EcommerceDB];
GO

PRINT 'Seeding catalog.Warehouses...';

DELETE FROM catalog.Warehouses;
GO


DELETE FROM catalog.Warehouses;
GO

INSERT INTO catalog.Warehouses (Name, Location)
VALUES
('Main Warehouse', 'Kathmandu'),
('Warehouse 2', 'Pokhara');
GO
PRINT 'Seeding catalog.Warehouses completed.';