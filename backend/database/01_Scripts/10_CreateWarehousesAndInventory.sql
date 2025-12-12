USE [EcommerceDB];
GO

IF OBJECT_ID(N'catalog.Warehouses', N'U') IS NOT NULL
     DROP TABLE catalog.Warehouses;
GO
CREATE TABLE catalog.Warehouses (
WarehouseId    INT IDENTITY(1,1) PRIMARY KEY,
Name           VARCHAR(200) NOT NULL,
Location       VARCHAR(500) NULL,
IsActive       BIT NOT NULL DEFAULT 1
);
GO
PRINT 'Table catalog.Warehouses created successfully.';
GO

IF OBJECT_ID(N'catalog.Inventory', N'U') IS NOT NULL
     DROP TABLE catalog.Inventory;
GO
CREATE TABLE catalog.Inventory (
InventoryId         INT IDENTITY(1,1) PRIMARY KEY,
ProductId           INT NULL,
WarehouseId         INT NULL,
QuantityOnHand      INT NOT NULL DEFAULT 0,
QuantityReserved    INT NOT NULL DEFAULT 0,
ReorderLevel        INT NOT NULL DEFAULT 0,
UpdatedAt           DATETIME2(3) NULL,
CONSTRAINT FK_Inventory_Product FOREIGN KEY (ProductId) REFERENCES catalog.Products(ProductId) ON DELETE CASCADE,
CONSTRAINT FK_Inventory_Warehouse FOREIGN KEY (WarehouseId) REFERENCES catalog.Warehouses(WarehouseId) ON DELETE SET NULL
);
CREATE INDEX IX_Inventory_Product ON catalog.Inventory(ProductId);
GO

PRINT 'Table catalog.Inventory created successfully.';
GO