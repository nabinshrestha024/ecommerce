USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'Orders', N'U') IS NOT NULL
	DROP TABLE Orders;
GO

CREATE TABLE Orders (
    OrderId BIGINT IDENTITY(1,1) PRIMARY KEY,
    OrderNumber VARCHAR(50) NOT NULL UNIQUE,
    UserId BIGINT NULL REFERENCES Users(UserId),
    ShippingAddress VARCHAR(MAX),
    BillingAddress VARCHAR(MAX),
    Subtotal DECIMAL(12,2) NOT NULL,
    ShippingCost DECIMAL(12,2) DEFAULT 0,
    Tax DECIMAL(12,2) DEFAULT 0,
    DiscountAmount DECIMAL(12,2) DEFAULT 0,
    Total DECIMAL(12,2) NOT NULL,
    PaymentStatus SMALLINT DEFAULT 0, -- 0: Pending, 1: Paid, 2: Failed, 3: Refunded
    FulfillmentStatus SMALLINT DEFAULT 0, -- 0: Pending, 1: Processing, 2: Shipped, 3: Delivered, 4: Canceled
    PlacedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    CompletedAt DATETIME2,
    CanceledAt DATETIME2,
    Notes VARCHAR(MAX),

    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

PRINT 'Orders table created successfully.';
GO