USE [EcommerceDB];
GO

IF OBJECT_ID(N'dbo.Wishlists', N'U') IS NOT NULL
    DROP TABLE dbo.Wishlists;
GO
CREATE TABLE dbo.Wishlists (
WishlistId  INT IDENTITY(1,1) PRIMARY KEY,
UserId      INT NOT NULL,
Name        VARCHAR(200) NULL,
CreatedAt   DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
CONSTRAINT FK_Wishlists_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId) ON DELETE CASCADE
);
GO
PRINT 'Table dbo.Wishlists created successfully.';
GO

IF OBJECT_ID(N'dbo.WishlistItems', N'U') IS NOT NULL
    DROP TABLE dbo.WishlistItems;
GO
CREATE TABLE dbo.WishlistItems (
WishlistItemId  INT IDENTITY(1,1) PRIMARY KEY,
WishlistId      INT NOT NULL,
ProductId       INT NULL,

CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
CONSTRAINT FK_WishlistItems_Wishlist FOREIGN KEY (WishlistId) REFERENCES dbo.Wishlists(WishlistId) ON DELETE CASCADE,
CONSTRAINT FK_WishlistItems_Product FOREIGN KEY (ProductId) REFERENCES catalog.Products(ProductId)
);
CREATE INDEX IX_WishlistItems_WishlistId ON dbo.WishlistItems(WishlistId);
GO

PRINT 'Table dbo.WishlistItems created successfully.';
GO