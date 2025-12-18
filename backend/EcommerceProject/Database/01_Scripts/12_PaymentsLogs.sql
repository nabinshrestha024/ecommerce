USE EcommerceDB;
GO

CREATE TABLE PaymentLogs (
    LogID BIGINT PRIMARY KEY IDENTITY(1,1),
    PaymentID INT NULL,
    OrderID INT NULL,
    EventType VARCHAR(50) NOT NULL, -- Initiated, Callback, Verification, etc.
    PaymentGateway VARCHAR(50) NULL,
    RequestData NVARCHAR(MAX) NULL,
    ResponseData NVARCHAR(MAX) NULL,
    Status VARCHAR(50) NULL,
    ErrorMessage VARCHAR(1000) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (PaymentID) REFERENCES Payments(PaymentID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);
PRINT 'Table PaymentLogs created successfully.';
GO