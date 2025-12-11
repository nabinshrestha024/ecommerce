USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'Shipments', N'U') IS NOT NULL
	DROP TABLE Shipments;
GO

CREATE TABLE Shipments (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    OrderId BIGINT NOT NULL REFERENCES Orders(OrderId),
    TrackingNumber VARCHAR(200),
    Carrier VARCHAR(100),
    ShippingMethod VARCHAR(100),
    ShippedAt DATETIME2,
    DeliveredAt DATETIME2,
    Status VARCHAR(100),
    Cost DECIMAL(12,2),
    LabelUrl VARCHAR(500),
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME()
);
GO

PRINT 'Shipments table created successfully.';
GO
