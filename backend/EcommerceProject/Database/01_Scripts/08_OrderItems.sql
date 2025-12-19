USE [EcommerceDB];
GO

CREATE TABLE OrderItems (
    OrderItemId     INT IDENTITY(1,1) PRIMARY KEY,
    OrderId         INT NOT NULL,
    ProductId       INT NOT NULL,
    Quantity        INT NOT NULL,
    UnitPrice       DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE NO ACTION
);
PRINT 'Table OrderItems created.';
GO