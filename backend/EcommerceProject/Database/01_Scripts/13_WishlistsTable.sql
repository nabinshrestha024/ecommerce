USE [EcommerceDB];
GO

CREATE TABLE Wishlists (
    WishlistId  INT IDENTITY(1,1) PRIMARY KEY,
    UserId      INT NOT NULL,
    ProductId   INT NOT NULL,
    AddedDate   DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE,
    UNIQUE (UserId, ProductId)
);
PRINT 'Table Wishlists created.';
GO