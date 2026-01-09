USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spAdminOrders_GetById
    @OrderId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        o.OrderId,
        o.UserId,
        u.FullName AS UserName, 
        o.OrderDate,
        o.TotalAmount,
        o.Status,
        o.ShippingName,
        o.ShippingAddress,
        o.ShippingCity,
        o.ShippingPhone,
        o.PaymentMethodId,
        o.PaymentStatus,
        o.PaymentGateway,
        o.Notes
    FROM Orders o
    LEFT JOIN Users u ON o.UserId = u.UserId
    WHERE o.OrderId = @OrderId
    ORDER BY o.OrderDate ASC;

    SELECT
        oi.OrderItemId,
        oi.ProductId,
        oi.VariantId,
        p.Name AS ProductName,
        pi.ImageUrl AS ProductImageUrl,
        p.Description AS ProductDescription,
        oi.Quantity,
        oi.UnitPrice,
        CAST(oi.Quantity * oi.UnitPrice AS DECIMAL(10,2)) AS LineTotal
    FROM OrderItems oi
    INNER JOIN Products p ON p.ProductId = oi.ProductId
    LEFT JOIN ProductImages pi ON pi.ProductId = oi.ProductId AND pi.IsPrimary = 1
    WHERE oi.OrderId = @OrderId
    ORDER BY oi.OrderItemId ASC;

    SELECT
        oi.OrderItemId,
        pa.Name AS Name,
        pav.Value AS Value
    FROM OrderItems oi
    INNER JOIN VariantAttributeValues vav ON oi.VariantId = vav.VariantId
    INNER JOIN ProductAttributeValues pav ON vav.AttributeValueId = pav.AttributeValueId
    INNER JOIN ProductAttributes pa ON pav.AttributeId = pa.AttributeId
    WHERE oi.OrderId = @OrderId;
END
GO
