USE ECommerceDB;
GO

CREATE TABLE PurchaseOrders (
    POId        INT IDENTITY(1001,1) PRIMARY KEY,
    VendorId    INT NOT NULL,
    OrderDate   DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    Status      VARCHAR(20) NOT NULL DEFAULT 'Pending',
    TotalAmount DECIMAL(10,2) NULL,
    Notes       VARCHAR(500) NULL,
    CreatedBy   INT NULL,
    FOREIGN KEY (VendorId) REFERENCES Vendors(VendorId),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserId)
);
PRINT 'Table PurchaseOrders created.';
GO