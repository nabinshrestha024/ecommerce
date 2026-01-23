USE [EcommerceDB]
GO
/****** Object:  StoredProcedure [dbo].[spOrders_GetMyOrders]    Script Date: 1/22/2026 4:27:02 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
 
ALTER   PROCEDURE [dbo].[spOrders_GetMyOrders]
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;
 
    SELECT
        o.OrderId,
        o.UserId,
        u.FullName,
        o.OrderDate,
        o.TotalAmount,
        o.GrandTotal,
        o.Status,
        o.PaymentStatus,
        o.ShippingCity,
 
        p.ProductId,
        p.Name AS ProductName,
        oi.Quantity,
        oi.UnitPrice,
        (oi.Quantity * oi.UnitPrice) AS LineTotal
 
    FROM Orders o
    INNER JOIN Users u 
        ON o.UserId = u.UserId
    INNER JOIN OrderItems oi 
        ON o.OrderId = oi.OrderId
    INNER JOIN Products p 
        ON oi.ProductId = p.ProductId
 
    WHERE o.UserId = @UserId
    ORDER BY o.OrderDate DESC, o.OrderId DESC;
END