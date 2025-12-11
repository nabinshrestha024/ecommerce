USE [EcommerceDB];
GO
-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'catalog.Inventories', N'U') IS NOT NULL
	DROP TABLE catalog.Inventories;
GO

CREATE TABLE catalog.Inventories (
    ProductId BIGINT PRIMARY KEY REFERENCES catalog.Products(ProductId) ON DELETE CASCADE,
    QuantityAvailable INT NOT NULL DEFAULT 0, 
    QuantityReserved INT NOT NULL DEFAULT 0, 
    SafetyStock INT DEFAULT 0, -- minimum stock to maintain
    ReorderLevel INT DEFAULT 0, -- stock level to trigger reorder
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

PRINT 'Inventories table created successfully.';
GO