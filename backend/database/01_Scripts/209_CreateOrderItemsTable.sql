USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'OrderItems', N'U') IS NOT NULL
	DROP TABLE OrderItems;
GO

CREATE TABLE OrderItems (
    OrderItemId BIGINT IDENTITY(1,1) PRIMARY KEY,
    OrderId BIGINT NOT NULL REFERENCES Orders(OrderId) ON DELETE CASCADE,
    ProductId BIGINT NOT NULL REFERENCES Products(ProductId),
    SKU VARCHAR(100),
    Title VARCHAR(300),
    UnitPrice DECIMAL(12,2),
    Quantity INT,
    TaxAmount DECIMAL(12,2) DEFAULT 0,
    DiscountAmount DECIMAL(12,2) DEFAULT 0,
    Total DECIMAL(12,2),
    CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
GO

PRINT 'OrderItems table created successfully.';
GO