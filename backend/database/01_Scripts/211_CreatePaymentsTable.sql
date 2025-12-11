USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'Payments', N'U') IS NOT NULL
	DROP TABLE Payments;
GO

CREATE TABLE Payments (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    OrderId BIGINT NOT NULL UNIQUE REFERENCES Orders(OrderId),
    Gateway VARCHAR(100) NOT NULL,
    GatewayPaymentId VARCHAR(200),
    Amount DECIMAL(12,2) NOT NULL,
    Status VARCHAR(100) NOT NULL, -- Pending, Completed, Failed, Refunded
    PaymentMethod VARCHAR(50) NOT NULL,
    CapturedAt DATETIME2,
    RefundedAmount DECIMAL(12,2) DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

PRINT 'Payments table created successfully.';
GO