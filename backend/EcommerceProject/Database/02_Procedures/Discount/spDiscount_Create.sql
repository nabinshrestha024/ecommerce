USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spDiscount_Create
    @ProductId INT,
    @Percentage DECIMAL(5,2),
    @StartDate DATETIME,
    @EndDate DATETIME,
    @MaxUsage INT = NULL,
    @PerUserLimit INT = NULL
AS
BEGIN
    INSERT INTO Discounts
    (
        ProductId,
        Percentage,
        StartDate,
        EndDate,
        MaxUsage,
        PerUserLimit,
        IsActive
    )
    VALUES
    (
        @ProductId,
        @Percentage,
        @StartDate,
        @EndDate,
        @MaxUsage,
        @PerUserLimit,
        1
    );
END

GO