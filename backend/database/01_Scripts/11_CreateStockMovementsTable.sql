USE [EcommerceDB];
GO
    
IF OBJECT_ID(N'catalog.StockMovements', N'U') IS NOT NULL 
    DROP TABLE catalog.StockMovements;
GO

CREATE TABLE catalog.StockMovements (
StockMovementId BIGINT IDENTITY(1,1) PRIMARY KEY,
ProductId       INT NULL,
WarehouseId     INT NULL,
MovementType    VARCHAR(50) NOT NULL, -- Sale, Purchase, Adjustment, Return
ReferenceType   VARCHAR(50) NULL, -- 'Order','PurchaseOrder'
ReferenceId     INT NULL,
Quantity        INT NOT NULL,
QuantityBefore  INT NULL,
QuantityAfter   INT NULL,
Notes           VARCHAR(1000) NULL,
CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
CONSTRAINT FK_Stock_Product FOREIGN KEY (ProductId) REFERENCES catalog.Products(ProductId),
CONSTRAINT FK_Stock_Warehouse FOREIGN KEY (WarehouseId) REFERENCES catalog.Warehouses(WarehouseId)
);
CREATE INDEX IX_StockMovements_Product ON catalog.StockMovements(ProductId);
GO

PRINT 'Table catalog.StockMovements created successfully.';
GO