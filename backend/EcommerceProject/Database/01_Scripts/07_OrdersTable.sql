USE [EcommerceDB];
GO

CREATE TABLE Orders (
    OrderID INT PRIMARY KEY IDENTITY(1001,1), -- start from 1001
    UserID INT NOT NULL,
    OrderDate DATETIME DEFAULT GETDATE(),
    TotalAmount DECIMAL(10,2) NOT NULL,
    Status VARCHAR(20) DEFAULT 'Pending',
    
    -- shipping address (snapshot at time of order)
    ShippingName NVARCHAR(100),
    ShippingAddress NVARCHAR(300) NOT NULL,
    ShippingCity NVARCHAR(50) NOT NULL,
    ShippingPhone VARCHAR(20) NOT NULL,
    
    PaymentMethod VARCHAR(20),
    PaymentStatus VARCHAR(20) DEFAULT 'Pending',
    
    Notes NVARCHAR(500),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

PRINT 'Table Orders created successfully.';
GO