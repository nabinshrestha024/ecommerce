USE [EcommerceDB];
GO

-- drop the table if it exists to allow re-running the script
IF OBJECT_ID(N'WishlistItems', N'U') IS NOT NULL
	DROP TABLE WishlistItems;
GO

CREATE TABLE WishlistItems (
    Id BIGINT IDENTITY(1,1) PRIMARY KEY,
    WishlistId BIGINT NOT NULL REFERENCES Wishlists(WishListId) ON DELETE CASCADE,
    ProductId BIGINT NOT NULL REFERENCES Products(ProductId),
    AddedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UQ_WishlistItem UNIQUE (WishlistId, ProductId)
);
GO

PRINT 'WishlistItems table created successfully.';
GO
