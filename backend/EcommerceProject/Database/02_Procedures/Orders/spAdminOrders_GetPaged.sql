USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spAdminOrders_GetPaged
    @Page INT,
    @PageSize INT,
    @Status VARCHAR(20) = NULL,
    @Search VARCHAR(100) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    ;WITH OrdersPaged AS (
        SELECT
            o.OrderId,
            o.UserId,
            o.OrderDate,
            o.TotalAmount,
            o.Status,
            o.PaymentStatus,
            o.ShippingName,
            o.ShippingPhone
        FROM Orders o
        WHERE
            (@Status IS NULL OR o.Status = @Status)
            AND (
                @Search IS NULL
                OR o.ShippingName LIKE '%' + @Search + '%'
                OR o.ShippingPhone LIKE '%' + @Search + '%'
            )
        ORDER BY o.OrderDate DESC
        OFFSET (@Page - 1) * @PageSize ROWS
        FETCH NEXT @PageSize ROWS ONLY
    )
    SELECT
        op.*,
        oi.OrderItemId,
        oi.ProductId,
        p.Name AS ProductName,
        pi.ImageUrl AS ProductImageUrl,
        p.Description AS ProductDescription,
        oi.Quantity,
        oi.UnitPrice,
        CAST(oi.Quantity * oi.UnitPrice AS DECIMAL(10,2)) AS LineTotal
    FROM OrdersPaged op
    LEFT JOIN OrderItems oi ON oi.OrderId = op.OrderId
    LEFT JOIN Products p ON p.ProductId = oi.ProductId
    LEFT JOIN ProductImages pi
    ON pi.ProductId = P.ProductId
    AND pi.IsPrimary = 1
    ORDER BY op.OrderDate DESC;

    SELECT COUNT(1)
    FROM Orders o
    WHERE
        (@Status IS NULL OR o.Status = @Status)
        AND (
            @Search IS NULL
            OR o.ShippingName LIKE '%' + @Search + '%'
            OR o.ShippingPhone LIKE '%' + @Search + '%'
        );
END
GO
