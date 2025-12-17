USE ECommerceDB;
GO

CREATE TABLE PurchaseOrderItems (
    POItemID INT PRIMARY KEY IDENTITY(1,1),
    POID INT NOT NULL,
    ProductID INT NOT NULL,
    Quantity INT NOT NULL,
    UnitCost DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (POID) REFERENCES PurchaseOrders(POID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

PRINT 'Table PurchaseOrderItems created successfully.';
GO
