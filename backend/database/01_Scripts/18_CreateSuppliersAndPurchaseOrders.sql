USE [EcommerceDB];
GO
IF OBJECT_ID(N'procure.Suppliers', N'U') IS NOT NULL
     DROP TABLE procure.Suppliers;
GO
CREATE TABLE procure.Suppliers (
SupplierId         INT IDENTITY(1,1) PRIMARY KEY,
Name               VARCHAR(250) NOT NULL,
ContactName        VARCHAR(150) NULL,
Phone              VARCHAR(50) NULL,
Email              VARCHAR(320) NULL,
Address            VARCHAR(1000) NULL,
IsActive           BIT NOT NULL DEFAULT 1,
CreatedAt DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
);
GO
PRINT 'Table procure.Suppliers created successfully.';
GO


IF OBJECT_ID(N'procure.PurchaseOrders', N'U') IS NOT NULL
     DROP TABLE procure.PurchaseOrders;
GO
CREATE TABLE procure.PurchaseOrders (
PurchaseOrderId     INT IDENTITY(1,1) PRIMARY KEY,
SupplierId          INT NOT NULL,
PurchaseOrderNumber VARCHAR(100) NOT NULL UNIQUE,
TotalAmount         DECIMAL(18,2) NOT NULL,
Currency            VARCHAR(10) NOT NULL DEFAULT 'NPR',
Status              VARCHAR(50) NOT NULL,
PlacedAt            DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
CONSTRAINT FK_PO_Supplier FOREIGN KEY (SupplierId) REFERENCES procure.Suppliers(SupplierId)
);
GO
PRINT 'Table procure.PurchaseOrders created successfully.';
GO


IF OBJECT_ID(N'procure.PurchaseOrderItems', N'U') IS NOT NULL
     DROP TABLE procure.PurchaseOrderItems; 
GO
CREATE TABLE procure.PurchaseOrderItems (
PurchaseOrderItemId INT IDENTITY(1,1) PRIMARY KEY,
PurchaseOrderId     INT NOT NULL,
ProductId           INT NULL,
Quantity            INT NOT NULL CHECK (Quantity > 0),
UnitCost            DECIMAL(18,4) NOT NULL,
TotalCost           AS (Quantity * UnitCost),
CONSTRAINT FK_POItems_PO FOREIGN KEY (PurchaseOrderId) REFERENCES procure.PurchaseOrders(PurchaseOrderId) ON DELETE CASCADE,
CONSTRAINT FK_POItems_Product FOREIGN KEY (ProductId) REFERENCES catalog.Products(ProductId)
);
GO
PRINT 'Table procure.PurchaseOrderItems created successfully.';
GO