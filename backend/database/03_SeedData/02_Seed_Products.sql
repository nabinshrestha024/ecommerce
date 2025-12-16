USE [EcommerceDB];
GO

PRINT 'Seeding catalog.Products...';

DELETE FROM catalog.Products;
GO

INSERT INTO catalog.Products (Sku, Name, ShortDescription, Description, Price, CreatedAt)
VALUES
('LAP-001', 'Dell Inspiron 15', 'Laptop', 'Dell laptop 15 inch', 999.99, SYSUTCDATETIME()),
('MOB-001', 'Samsung Galaxy S23', 'Mobile', 'Samsung flagship phone', 819.88, SYSUTCDATETIME());
GO
