USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'ShipmentItems', N'U') IS NOT NULL
	DROP TABLE ShipmentItems;
GO

CREATE TABLE ShipmentItems (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    ShipmentId BIGINT NOT NULL REFERENCES Shipments(Id) ON DELETE CASCADE,
    OrderItemId BIGINT NOT NULL REFERENCES OrderItems(Id)
);
GO

PRINT 'ShipmentItems table created successfully.';
GO
