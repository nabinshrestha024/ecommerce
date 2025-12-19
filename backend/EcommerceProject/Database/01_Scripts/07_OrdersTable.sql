USE [EcommerceDB];
GO

CREATE TABLE Orders (
    OrderId         INT IDENTITY(1001,1) PRIMARY KEY,
    UserId          INT NOT NULL,
    OrderDate       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    TotalAmount     DECIMAL(10,2) NOT NULL,
    Status          VARCHAR(20) NOT NULL DEFAULT 'Pending',

    ShippingName    VARCHAR(100) NULL,
    ShippingAddress VARCHAR(300) NOT NULL,
    ShippingCity    VARCHAR(50) NOT NULL,
    ShippingPhone   VARCHAR(20) NOT NULL,

    PaymentMethodId INT NOT NULL,
    PaymentStatus   VARCHAR(20) NOT NULL DEFAULT 'Pending',
    PaymentGateway  VARCHAR(50) NULL,
    Notes           VARCHAR(500) NULL,

    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (PaymentMethodId) REFERENCES PaymentMethods(PaymentMethodId)
);
PRINT 'Table Orders created.';
GO