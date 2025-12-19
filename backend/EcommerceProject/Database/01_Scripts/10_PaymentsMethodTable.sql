USE [EcommerceDB];
GO

CREATE TABLE PaymentMethods (
    PaymentMethodId INT IDENTITY(1,1) PRIMARY KEY,
    Name            VARCHAR(50) NOT NULL,
    Code            VARCHAR(20) NOT NULL UNIQUE,
    IsActive        BIT NOT NULL DEFAULT 1,
    CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
);
PRINT 'Table PaymentMethods created.';
GO

INSERT INTO PaymentMethods (Name, Code)
VALUES
('eSewa', 'esewa'),
('Khalti', 'khalti'),
('Cash on Delivery', 'cod');
GO