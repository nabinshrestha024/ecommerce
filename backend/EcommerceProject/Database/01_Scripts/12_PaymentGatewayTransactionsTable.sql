USE EcommerceDB;
GO

CREATE TABLE PaymentGatewayTransactions (
    Id                   INT IDENTITY(1,1) PRIMARY KEY,
    GatewayName          VARCHAR(200) NOT NULL,
    GatewayTransactionId VARCHAR(200) NULL,
    PaymentId            INT NOT NULL,
    TransactionId        VARCHAR(200) NOT NULL,
    Amount               DECIMAL(18,2) NOT NULL,
    Status               VARCHAR(50) NOT NULL,
    GatewayStatus        VARCHAR(100) NULL,
    RetryCount           INT NOT NULL DEFAULT 0,
    RawResponse          VARCHAR(MAX) NULL,
    CreatedAt            DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt            DATETIME2(3) NULL,
    FOREIGN KEY (PaymentId) REFERENCES Payments(PaymentId)
);

PRINT 'Table PaymentGatewayTransactions created.';
GO