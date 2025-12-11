USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'PurchaseOrders', N'U') IS NOT NULL
    DROP TABLE PurchaseOrders;
GO

CREATE TABLE PurchaseOrders (
    PurchaseOrderId BIGINT IDENTITY(1,1) PRIMARY KEY,
    SupplierId BIGINT REFERENCES Suppliers(Id),
    PONumber VARCHAR(200) UNIQUE,
    Status VARCHAR(200),
    ExpectedDate DATE,
    Total DECIMAL(12,2),
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

PRINT 'PurchaseOrders table created successfully.';
GO