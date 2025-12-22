USE EcommerceDB;
GO

CREATE TABLE Discounts (
    DiscountId INT PRIMARY KEY IDENTITY,
    ProductId INT NOT NULL,
    DiscountType VARCHAR(20), 
    DiscountValue DECIMAL(10,2), 
    IsPercentage BIT,
    MinQuantity INT NULL, 
    StartDate DATETIME,
    EndDate DATETIME,
    MaxUsage INT NULL,
    PerUserLimit INT NULL,
    IsActive BIT DEFAULT 1,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);
