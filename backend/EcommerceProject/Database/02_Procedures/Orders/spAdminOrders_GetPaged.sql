USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spAdminOrders_GetPaged
    @Page INT = 1,
    @PageSize INT = 20,
    @Status VARCHAR(20) = NULL,
    @Search VARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    IF @Page < 1 SET @Page = 1;
    IF @PageSize < 1 SET @PageSize = 20;

    DECLARE @Offset INT = (@Page - 1) * @PageSize;

    ;WITH Q AS
    (
        SELECT
            o.OrderId,
            o.UserId,
            o.OrderDate,
            o.TotalAmount,
            o.Status,
            o.PaymentStatus,
            o.ShippingName,
            o.ShippingPhone,
            ROW_NUMBER() OVER (ORDER BY o.OrderDate DESC) AS rn
        FROM Orders o
        WHERE
            (@Status IS NULL OR o.Status = @Status)
            AND (
                @Search IS NULL
                OR o.ShippingName LIKE '%' + @Search + '%'
                OR o.ShippingPhone LIKE '%' + @Search + '%'
                OR CAST(o.OrderId AS VARCHAR(20)) LIKE '%' + @Search + '%'
            )
    )
    SELECT *
    FROM Q
    WHERE rn > @Offset AND rn <= (@Offset + @PageSize);

    SELECT COUNT(1) AS TotalCount
    FROM Orders o
    WHERE
        (@Status IS NULL OR o.Status = @Status)
        AND (
            @Search IS NULL
            OR o.ShippingName LIKE '%' + @Search + '%'
            OR o.ShippingPhone LIKE '%' + @Search + '%'
            OR CAST(o.OrderId AS VARCHAR(20)) LIKE '%' + @Search + '%'
        );
END
GO
