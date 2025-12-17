USE [EcommerceDB];
GO

CREATE TABLE Wishlists (
    WishlistID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    ProductID INT NOT NULL,
    AddedDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    UNIQUE (UserID, ProductID)
);

PRINT 'Table Wishlists created successfully.';
GO