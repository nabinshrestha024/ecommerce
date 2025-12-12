USE [EcommerceDB];
GO
IF OBJECT_ID(N'sales.Orders', N'U') IS NOT NULL
    DROP TABLE sales.Orders;
GO
CREATE TABLE sales.Orders (
OrderId             INT IDENTITY(1,1) PRIMARY KEY,
UserId              INT NOT NULL,
OrderNumber         VARCHAR(50) NOT NULL UNIQUE,
Status              SMALLINT NOT NULL DEFAULT 0, -- 0: Created, 1:Confirmed, 2:Processing, 3:Shipped, 4:Delivered, 5:Cancelled
SubTotal            DECIMAL(18,2) NOT NULL,
ShippingFee         DECIMAL(18,2) NOT NULL DEFAULT 0,
DiscountAmount      DECIMAL(18,2) NOT NULL DEFAULT 0,
TaxAmount           DECIMAL(18,2) NOT NULL DEFAULT 0,
TotalAmount         DECIMAL(18,2) NOT NULL,
BillingAddressId    INT NULL,
ShippingAddressId   INT NULL,
PlacedAt            DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
UpdatedAt           DATETIME2(3) NULL,
CONSTRAINT FK_Orders_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId),
CONSTRAINT FK_Orders_BillingAddress FOREIGN KEY (BillingAddressId) REFERENCES dbo.Addresses(AddressId),
CONSTRAINT FK_Orders_ShippingAddress FOREIGN KEY (ShippingAddressId) REFERENCES dbo.Addresses(AddressId)
);
CREATE INDEX IX_Orders_UserId ON sales.Orders(UserId);
GO
PRINT 'Table sales.Orders created successfully.';
GO

IF OBJECT_ID(N'sales.OrderItems', N'U') IS NOT NULL
    DROP TABLE sales.OrderItems;
GO
CREATE TABLE sales.OrderItems (
OrderItemId     INT IDENTITY(1,1) PRIMARY KEY,
OrderId         INT NOT NULL,
ProductId       INT NULL,
Quantity        INT NOT NULL CHECK (Quantity > 0),
UnitPrice       DECIMAL(18,2) NOT NULL,
TotalPrice      AS (Quantity * UnitPrice),
CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
CONSTRAINT FK_OrderItems_Order FOREIGN KEY (OrderId) REFERENCES sales.Orders(OrderId) ON DELETE CASCADE,
CONSTRAINT FK_OrderItems_Product FOREIGN KEY (ProductId) REFERENCES catalog.Products(ProductId)
);
CREATE INDEX IX_OrderItems_OrderId ON sales.OrderItems(OrderId);
GO

PRINT 'Table sales.OrderItems created successfully.';
GO