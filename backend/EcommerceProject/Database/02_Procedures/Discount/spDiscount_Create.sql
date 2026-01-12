USE [EcommerceDB]
GO

CREATE OR ALTER   PROCEDURE spDiscount_Create
    @DiscountName NVARCHAR(100),
    @DiscountType NVARCHAR(20),       -- 'Percentage' or 'Flat'
    @DiscountValue DECIMAL(18,2),
    @StartDate DATETIME,
    @EndDate DATETIME,
    @IsActive BIT
AS
BEGIN
    INSERT INTO Discounts
    (
        DiscountName,
        DiscountType,
        DiscountValue,
        StartDate,
        EndDate,
        IsActive
    )
    VALUES
    (
        @DiscountName,
        @DiscountType,
        @DiscountValue,
        @StartDate,
        @EndDate,
        @IsActive
    );
    SELECT SCOPE_IDENTITY();
END