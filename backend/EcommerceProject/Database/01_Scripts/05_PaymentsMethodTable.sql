USE [EcommerceDB];
GO

CREATE TABLE PaymentMethods (
    PaymentMethodID INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(50) NOT NULL,
    Code VARCHAR(20) NOT NULL UNIQUE,
    Description VARCHAR(500) NULL,
    IsActive BIT DEFAULT 1,
    SortOrder INT DEFAULT 0,
    Config NVARCHAR(MAX) NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
PRINT 'Table PaymentMethods created successfully.';

INSERT INTO PaymentMethods (Name, Code, Description, IsActive, SortOrder) VALUES
('eSewa', 'esewa', 'Digital Wallet - eSewa', 1, 1),
('Khalti', 'khalti', 'Digital Wallet - Khalti', 1, 2),
('Cash on Delivery', 'cod', 'Cash on Delivery', 1, 3);

PRINT 'Default payment methods inserted.';
GO
