USE [EcommerceDB];
GO
IF OBJECT_ID(N'sales.Shipments', N'U') IS NOT NULL
     DROP TABLE sales.Shipments;
GO
CREATE TABLE sales.Shipments (
ShipmentId          INT IDENTITY(1,1) PRIMARY KEY,
OrderId             INT NOT NULL,
ShipmentNumber      VARCHAR(100) NOT NULL UNIQUE,
Carrier             VARCHAR(200) NULL,
TrackingNumber      VARCHAR(200) NULL,
Status              VARCHAR(50) NULL,
ShippedAt           DATETIME2(3) NULL,
ExpectedDeliveryAt  DATETIME2(3) NULL,
CreatedAt           DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
CONSTRAINT FK_Shipments_Order FOREIGN KEY (OrderId) REFERENCES sales.Orders(OrderId) ON DELETE CASCADE
);
CREATE INDEX IX_Shipments_OrderId ON sales.Shipments(OrderId);
GO
PRINT 'Table sales.Shipments created successfully.';
GO

IF OBJECT_ID(N'sales.ShipmentItems', N'U') IS NOT NULL
     DROP TABLE sales.ShipmentItems;
GO
CREATE TABLE sales.ShipmentItems (
ShipmentItemId      INT IDENTITY(1,1) PRIMARY KEY,
ShipmentId          INT NOT NULL,
OrderItemId         INT NOT NULL,
Quantity            INT NOT NULL CHECK (Quantity > 0),
CreatedAt           DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
CONSTRAINT FK_ShipmentItems_Shipment FOREIGN KEY (ShipmentId) REFERENCES sales.Shipments(ShipmentId) ON DELETE CASCADE,
CONSTRAINT FK_ShipmentItems_OrderItem FOREIGN KEY (OrderItemId) REFERENCES sales.OrderItems(OrderItemId)
);
GO
PRINT 'Table sales.ShipmentItems created successfully.';
GO