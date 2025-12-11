USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'catalog.StockMovements', N'U') IS NOT NULL
	DROP TABLE catalog.StockMovements;
GO

CREATE TABLE catalog.StockMovements (
    StockMovementId BIGINT IDENTITY(1,1) PRIMARY KEY,
    ProductId BIGINT NOT NULL REFERENCES catalog.Products(ProductId) ON DELETE CASCADE,
    ChangeQty INT NOT NULL, -- positive/negative
    Type VARCHAR(200) NOT NULL,
    ReferenceId BIGINT NULL, -- OrderId, ReturnId
    Notes VARCHAR(MAX) NULL,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    CreatedBy BIGINT NULL REFERENCES Users(UserId)
);
GO

PRINT 'StockMovements table created successfully.';
GO