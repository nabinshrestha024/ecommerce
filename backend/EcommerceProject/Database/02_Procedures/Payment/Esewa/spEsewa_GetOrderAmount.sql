USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spEsewa_GetOrderAmount
    @OrderId INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT o.TotalAmount
    FROM Orders o
    WHERE o.OrderId = @OrderId
      AND o.PaymentStatus = 'Pending';
END
GO

PRINT 'Stored Procedure spEsewa_GetOrderAmount created or altered successfully.';
