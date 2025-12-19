USE ECommerceDB;
GO

CREATE TABLE PurchaseOrderItems (
    POItemId    INT IDENTITY(1,1) PRIMARY KEY,
    POId        INT NOT NULL,
    ProductId   INT NOT NULL,
    Quantity    INT NOT NULL,
    UnitCost    DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (POId) REFERENCES PurchaseOrders(POId) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);
PRINT 'Table PurchaseOrderItems created.';
GO
