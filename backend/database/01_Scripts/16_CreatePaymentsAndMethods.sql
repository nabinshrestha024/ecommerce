USE [EcommerceDB];
GO
IF OBJECT_ID(N'sales.PaymentMethods', N'U') IS NOT NULL
     DROP TABLE sales.PaymentMethods;
GO
CREATE TABLE sales.PaymentMethods (
PaymentMethodId    INT IDENTITY(1,1) PRIMARY KEY,
Name               VARCHAR(200) NOT NULL UNIQUE,
Type               VARCHAR(100) NOT NULL, -- 'CreditCard','PayPal','BankTransfer','CashOnDelivery'
Status             VARCHAR(50) NOT NULL,
CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
);
GO
PRINT 'Table sales.PaymentMethods created successfully.';
GO

IF OBJECT_ID(N'sales.Payments', N'U') IS NOT NULL
     DROP TABLE sales.Payments;
GO
CREATE TABLE sales.Payments (
PaymentId                INT IDENTITY(1,1) PRIMARY KEY,
OrderId                  INT NOT NULL,
PaymentMethodId          INT NULL,
Amount                   DECIMAL(18,2) NOT NULL,
Currency                 VARCHAR(10) NOT NULL DEFAULT 'NPR',
Status                   VARCHAR(50) NOT NULL,
ProviderTransactionId    VARCHAR(200) NULL,
PaidAt                   DATETIME2(3) NULL,
CreatedAt                DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
CONSTRAINT FK_Payments_Order FOREIGN KEY (OrderId) REFERENCES sales.Orders(OrderId),
CONSTRAINT FK_Payments_Method FOREIGN KEY (PaymentMethodId) REFERENCES sales.PaymentMethods(PaymentMethodId)
);
CREATE INDEX IX_Payments_OrderId ON sales.Payments(OrderId);
GO
PRINT 'Table sales.Payments created successfully.';
GO

IF OBJECT_ID(N'sales.GatewayTransactions', N'U') IS NOT NULL
     DROP TABLE sales.GatewayTransactions;
GO
CREATE TABLE sales.GatewayTransactions (
Id                   INT IDENTITY(1,1) PRIMARY KEY,
GatewayName          VARCHAR(200) NOT NULL,
GatewayTransactionId VARCHAR(200) NULL,
PaymentId            INT NOT NULL,
TransactionId        VARCHAR(200) NOT NULL,
Amount               DECIMAL(18,2) NOT NULL,
Status               VARCHAR(50) NOT NULL,
GatewayStatus        VARCHAR(100) NULL,
RetryCount           INT NOT NULL DEFAULT 0,
CreatedAt            DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
UpdatedAt            DATETIME2(3) NULL,

CONSTRAINT FK_GatewayTransactions_Payment FOREIGN KEY (PaymentId) REFERENCES sales.Payments(PaymentId)
);
GO
PRINT 'Table sales.GatewayTransactions created successfully.';
GO

IF OBJECT_ID(N'sales.Transactions', N'U') IS NOT NULL
     DROP TABLE sales.Transactions;
GO
CREATE TABLE sales.Transactions (
TransactionId       BIGINT IDENTITY(1,1) PRIMARY KEY,
PaymentId           INT NULL,
Type                VARCHAR(50) NOT NULL, -- 'Auth','Capture','Refund'
Amount              DECIMAL(18,2) NOT NULL,
TransactionMode    CHAR(1) NOT NULL CHECK (TransactionMode IN ('D','C')), -- 'D' = Debit, 'C' = Credit--
CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
CONSTRAINT FK_Transactions_Payment FOREIGN KEY (PaymentId) REFERENCES sales.Payments(PaymentId)
);
GO
PRINT 'Table sales.Transactions created successfully.';
GO