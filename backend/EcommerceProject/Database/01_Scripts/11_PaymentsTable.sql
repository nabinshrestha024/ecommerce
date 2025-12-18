USE [EcommerceDB];
GO

CREATE TABLE Payments (
    PaymentID               INT PRIMARY KEY IDENTITY(1,1),
    OrderID                 INT NOT NULL,
    PaymentDate             DATETIME DEFAULT GETDATE(),
    Amount                  DECIMAL(10,2) NOT NULL,
    PaymentMethod           VARCHAR(20) NOT NULL,
    PaymentStatus           VARCHAR(20) DEFAULT 'Pending',
    TransactionID           VARCHAR(200) NULL, 
    PaymentGateway          VARCHAR(50) NULL,  
    PaymentURL              VARCHAR(500) NULL, -- For storing payment initiation URLs
    PaymentProviderReference VARCHAR(200) NULL, -- Provider's transaction ID
    Metadata                NVARCHAR(MAX) NULL, -- JSON data for additional info
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

PRINT 'Table Payments created successfully.';
GO
