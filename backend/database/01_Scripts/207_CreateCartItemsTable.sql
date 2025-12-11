USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'CartItems', N'U') IS NOT NULL
	DROP TABLE CartItems;
GO

CREATE TABLE CartItems (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    CartId BIGINT NOT NULL REFERENCES Carts(Id) ON DELETE CASCADE,
    ProductId BIGINT NOT NULL REFERENCES Products(ProductId),
    Quantity INT NOT NULL,
    UnitPrice DECIMAL(12,2) NOT NULL,
    AddedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_CartItem UNIQUE (CartId, ProductId)
);
GO

PRINT 'CartItems table created successfully.';
GO  