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
            u.FullName AS UserName,
            o.OrderDate,
            o.TotalAmount,
            o.Status,
            o.PaymentStatus,
            o.ShippingName,
            o.ShippingPhone
        FROM Orders o
        INNER JOIN Users u ON u.UserId = o.UserId
        WHERE
            (@Status IS NULL OR o.Status = @Status)
            AND (
                @Search IS NULL
                OR o.ShippingName LIKE '%' + @Search + '%'
                OR o.ShippingPhone LIKE '%' + @Search + '%'
            )
        ORDER BY o.OrderDate ASC 
        OFFSET (@Page - 1) * @PageSize ROWS
        FETCH NEXT @PageSize ROWS ONLY
    )
    SELECT
        op.*,
        oi.OrderItemId,
        oi.ProductId,
        oi.VariantId,
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
    ORDER BY op.OrderDate ASC;

    SELECT COUNT(1)
    FROM Orders o
    WHERE
        (@Status IS NULL OR o.Status = @Status)
        AND (
            @Search IS NULL
            OR o.ShippingName LIKE '%' + @Search + '%'
            OR o.ShippingPhone LIKE '%' + @Search + '%'
        );
    
    SELECT
        oi.OrderItemId,
        pa.Name AS Name,
        pav.Value AS Value
    FROM OrderItems oi
    INNER JOIN Orders o ON oi.OrderId = o.OrderId
    INNER JOIN VariantAttributeValues vav ON oi.VariantId = vav.VariantId
    INNER JOIN ProductAttributeValues pav ON vav.AttributeValueId = pav.AttributeValueId
    INNER JOIN ProductAttributes pa ON pav.AttributeId = pa.AttributeId
    WHERE oi.OrderId IN (
        SELECT o2.OrderId FROM Orders o2
        WHERE (@Status IS NULL OR o2.Status = @Status)
        AND (@Search IS NULL OR o2.ShippingName LIKE '%' + @Search + '%' OR o2.ShippingPhone LIKE '%' + @Search + '%')
        ORDER BY o2.OrderDate ASC 
        OFFSET (@Page - 1) * @PageSize ROWS FETCH NEXT @PageSize ROWS ONLY
    );
END
GO
