USE EcommerceDB;
GO

CREATE TABLE Payments (
    PaymentId               INT IDENTITY(1,1) PRIMARY KEY,
    OrderId                 INT NOT NULL,
    PaymentDate             DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    Amount                  DECIMAL(10,2) NOT NULL,
    Status                  VARCHAR(20) NOT NULL DEFAULT 'Pending',
    PaymentMethod           VARCHAR(20) NOT NULL,
    PaymentStatus           VARCHAR(20) NOT NULL DEFAULT 'Pending',
    TransactionId           VARCHAR(200) NULL,
    PaymentGateway          VARCHAR(50) NULL,
    PaymentURL              VARCHAR(500) NULL,
    GatewayReference        VARCHAR(200) NULL,
    Metadata                VARCHAR(MAX) NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId)
);
PRINT 'Table Payments created.';
GO