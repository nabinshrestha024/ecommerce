USE EcommerceDB;
GO
CREATE OR ALTER PROCEDURE spOrders_GetByIdForUser_Header
    @UserId INT,
    @OrderId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT TOP 1
    o.OrderId,
    o.UserId,
    o.OrderDate,

    CAST(
        SUM(
            oi.Quantity *
            CASE
                WHEN d.DiscountType = 'Percentage'
                    THEN oi.UnitPrice - (oi.UnitPrice * d.DiscountValue / 100.0)
                WHEN d.DiscountType = 'Flat'
                    THEN oi.UnitPrice - d.DiscountValue
                ELSE oi.UnitPrice
            END
        ) 
    AS DECIMAL(10,2)) AS TotalAmount,

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
INNER JOIN OrderItems oi
    ON o.OrderId = oi.OrderId

LEFT JOIN ProductVariants pv
    ON pv.VariantId = oi.VariantId

LEFT JOIN Discounts d
    ON d.DiscountId = pv.DiscountId
   AND d.IsActive = 1
   AND (d.StartDate IS NULL OR d.StartDate <= GETDATE())
   AND (d.EndDate IS NULL OR d.EndDate >= GETDATE())

WHERE o.OrderId = @OrderId
  AND o.UserId = @UserId

GROUP BY
    o.OrderId,
    o.UserId,
    o.OrderDate,
    o.Status,
    o.ShippingName,
    o.ShippingAddress,
    o.ShippingCity,
    o.ShippingPhone,
    o.PaymentMethodId,
    o.PaymentStatus,
    o.PaymentGateway,
    o.Notes;

END
GO
