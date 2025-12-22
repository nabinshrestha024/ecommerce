CREATE TABLE DiscountUsages (
    UsageID INT PRIMARY KEY IDENTITY,
    DiscountID INT,
    UserID INT,
    UsedDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (DiscountID) REFERENCES Discounts(DiscountID)
);
