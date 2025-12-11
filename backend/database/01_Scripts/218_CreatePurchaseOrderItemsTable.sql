USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'PurchaseOrderItems', N'U') IS NOT NULL
    DROP TABLE PurchaseOrderItems;
GO

CREATE TABLE PurchaseOrderItems (
    PurchaseOrderItemId BIGINT IDENTITY(1,1) PRIMARY KEY,
    PurchaseOrderId BIGINT NOT NULL REFERENCES PurchaseOrders(PurchaseOrderId) ON DELETE CASCADE,
    ProductId BIGINT NOT NULL REFERENCES Products(ProductId),
    Quantity INT,
    UnitCost DECIMAL(12,2)
);
GO

PRINT 'PurchaseOrderItems table created successfully.';
GO