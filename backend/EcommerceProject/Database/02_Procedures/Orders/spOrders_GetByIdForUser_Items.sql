USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spOrders_GetByIdForUser_Items
    @UserId INT,
    @OrderId INT
AS
BEGIN
    SET NOCOUNT ON;

    IF NOT EXISTS (SELECT 1 FROM Orders WHERE OrderId = @OrderId AND UserId = @UserId)
        RETURN;

 SELECT
    oi.OrderItemId,
    oi.ProductId,
    oi.VariantId,
    p.Name AS ProductName,
    pi.ImageUrl AS ProductImageUrl,
    p.Description AS ProductDescription,
    oi.Quantity,
    oi.UnitPrice,

    d.DiscountId,
    d.DiscountType,
    d.DiscountValue,

    CAST(
        CASE
            WHEN d.DiscountType = 'Percentage'
                THEN oi.UnitPrice - (oi.UnitPrice * d.DiscountValue / 100.0)
            WHEN d.DiscountType = 'Flat'
                THEN oi.UnitPrice - d.DiscountValue
            ELSE oi.UnitPrice
        END
    AS DECIMAL(10,2)) AS DiscountedUnitPrice,

 
    CAST(
        oi.Quantity *
        CASE
            WHEN d.DiscountType = 'Percentage'
                THEN oi.UnitPrice - (oi.UnitPrice * d.DiscountValue / 100.0)
            WHEN d.DiscountType = 'Flat'
                THEN oi.UnitPrice - d.DiscountValue
            ELSE oi.UnitPrice
        END
    AS DECIMAL(10,2)) AS LineTotal

FROM OrderItems oi

INNER JOIN Products p 
    ON p.ProductId = oi.ProductId

LEFT JOIN ProductImages pi
    ON pi.ProductId = oi.ProductId
   AND pi.IsPrimary = 1

LEFT JOIN ProductVariants pv
    ON pv.VariantId = oi.VariantId

LEFT JOIN Discounts d
    ON d.DiscountId = pv.DiscountId
   AND d.IsActive = 1
   AND (d.StartDate IS NULL OR d.StartDate <= GETDATE())
   AND (d.EndDate IS NULL OR d.EndDate >= GETDATE())

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
