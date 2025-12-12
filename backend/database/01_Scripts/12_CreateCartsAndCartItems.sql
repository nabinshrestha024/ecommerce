USE [EcommerceDB];
GO
IF OBJECT_ID(N'dbo.Carts', N'U') IS NOT NULL
    DROP TABLE dbo.Carts;
GO
CREATE TABLE dbo.Carts (
CartId      INT IDENTITY(1,1) PRIMARY KEY,
UserId      INT NULL,
SessionId   VARCHAR(200) NULL,
CreatedAt   DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
UpdatedAt   DATETIME2(3) NULL,
CONSTRAINT FK_Carts_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE SET NULL
);
GO
PRINT 'Table dbo.Carts created successfully.';
GO

IF OBJECT_ID(N'dbo.CartItems', N'U') IS NOT NULL
    DROP TABLE dbo.CartItems;
GO
CREATE TABLE dbo.CartItems (
CartItemId      INT IDENTITY(1,1) PRIMARY KEY,
CartId          INT NOT NULL,
ProductId       INT NULL,
Quantity        INT NOT NULL CHECK (Quantity > 0),
UnitPrice       DECIMAL(18,2) NOT NULL,
CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
CONSTRAINT FK_CartItems_Cart FOREIGN KEY (CartId) REFERENCES dbo.Carts(CartId) ON DELETE CASCADE,
CONSTRAINT FK_CartItems_Product FOREIGN KEY (ProductId) REFERENCES catalog.Products(ProductId)
);
CREATE INDEX IX_CartItems_CartId ON dbo.CartItems(CartId);
GO

PRINT 'Tables dbo.Carts and dbo.CartItems created successfully.';
GO