USE ECommerceDB;
GO

CREATE TABLE PurchaseOrders (
    POID            INT PRIMARY KEY IDENTITY(1001,1),
    VendorID        INT NOT NULL,
    OrderDate       DATETIME DEFAULT GETDATE(),
    Status          VARCHAR(20) DEFAULT 'Pending',
    TotalAmount     DECIMAL(10,2),
    Notes           VARCHAR(500),
    CreatedBy       INT,
    FOREIGN KEY (VendorID) REFERENCES Vendors(VendorID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID)
);

PRINT 'Table PurchaseOrders created successfully.';
GO