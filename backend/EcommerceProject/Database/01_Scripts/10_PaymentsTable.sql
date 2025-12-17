USE [EcommerceDB];
GO

CREATE TABLE Payments (
    PaymentID       INT PRIMARY KEY IDENTITY(1,1),
    OrderID         INT NOT NULL,
    PaymentDate     DATETIME DEFAULT GETDATE(),
    Amount          DECIMAL(10,2) NOT NULL,
    PaymentMethod   VARCHAR(20) NOT NULL,
    PaymentStatus   VARCHAR(20) DEFAULT 'Pending',
    TransactionID   VARCHAR(100),
    PaymentGateway  VARCHAR(20),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

PRINT 'Table Payments created successfully.';
GO
