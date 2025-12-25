USE EcommerceDB;
GO

CREATE TABLE Discounts (
    DiscountId INT PRIMARY KEY IDENTITY,
    ProductId INT NOT NULL,
    Percentage DECIMAL(5,2),
    StartDate DATETIME,
    EndDate DATETIME,
    MaxUsage INT NULL,
    PerUserLimit INT NULL,
    IsActive BIT DEFAULT 1,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);
