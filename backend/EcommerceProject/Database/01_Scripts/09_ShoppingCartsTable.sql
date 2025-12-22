USE [EcommerceDB];
GO

CREATE TABLE CartItems (
    CartId      INT PRIMARY KEY IDENTITY(1,1),
    UserId      INT NOT NULL,
    ProductId   INT NOT NULL,
    Quantity    INT NOT NULL DEFAULT 1,
    AddedDate   DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE,
    UNIQUE (UserId, ProductId)
);

PRINT 'Table ShoppingCarts created successfully.';
GO