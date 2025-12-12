USE [EcommerceDB];
GO
-- additional indexes for performance
CREATE INDEX IX_Products_Sku ON catalog.Products(Sku);
CREATE INDEX IX_Orders_OrderNumber ON sales.Orders(OrderNumber);
CREATE INDEX IX_Payments_Status ON sales.Payments(Status);


PRINT 'Additional indexes created successfully.';
GO