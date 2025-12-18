USE [EcommerceDB];
GO

CREATE TABLE Orders (
    OrderID         INT PRIMARY KEY IDENTITY(1001,1), -- start from 1001
    UserID          INT NOT NULL,
    OrderDate       DATETIME DEFAULT GETDATE(),
    TotalAmount     DECIMAL(10,2) NOT NULL,
    Status          VARCHAR(20) DEFAULT 'Pending',
    
    -- shipping address
    ShippingName    VARCHAR(100),
    ShippingAddress VARCHAR(300) NOT NULL,
    ShippingCity    VARCHAR(50) NOT NULL,
    ShippingPhone   VARCHAR(20) NOT NULL,
    
    PaymentMethod   VARCHAR(20),
    PaymentStatus   VARCHAR(20) DEFAULT 'Pending',
    PaymentGateway  VARCHAR(50),
    
    Notes           VARCHAR(500),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

PRINT 'Table Orders created successfully.';
GO