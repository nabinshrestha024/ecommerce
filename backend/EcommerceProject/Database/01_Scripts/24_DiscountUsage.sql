USE [EcommerceDB];
GO

CREATE TABLE DiscountUsages (
    UsageId INT PRIMARY KEY IDENTITY,
    DiscountId INT,
    UserId INT,
    UsedDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (DiscountId) REFERENCES Discounts(DiscountId)
);
