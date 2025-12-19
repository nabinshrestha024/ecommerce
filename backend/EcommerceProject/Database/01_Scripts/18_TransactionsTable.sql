USE EcommerceDB;
GO

CREATE TABLE Transactions (
    TransactionId  BIGINT IDENTITY(1,1) PRIMARY KEY,
    OrderId        INT NOT NULL,
    PaymentId      INT NULL,
    Type           VARCHAR(20) NOT NULL, -- Debit, Credit, Refund
    Amount         DECIMAL(18,2) NOT NULL,
    Currency       VARCHAR(10) DEFAULT 'NPR',
    Status         VARCHAR(20) NOT NULL,
    PaymentGatewayReference      VARCHAR(200) NULL,
    CreatedAt      DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId),
    FOREIGN KEY (PaymentId) REFERENCES Payments(PaymentId)
);
PRINT 'Table Transactions created.';
GO