USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spCheckoutSelectedItems  
    @UserId INT,  
    @SelectedCartItemIds NVARCHAR(MAX), -- comma-separated list of CartItemIds  
    @ShippingName NVARCHAR(100),
    @ShippingAddress NVARCHAR(200),
    @ShippingCity NVARCHAR(100),
    @ShippingPhone NVARCHAR(20)
AS  
BEGIN  
    SET NOCOUNT ON;  

    BEGIN TRANSACTION;
    BEGIN TRY
  
    -- Convert CSV string to table  
    DECLARE @Ids TABLE (CartId INT);  
    INSERT INTO @Ids(CartId)  
    SELECT value FROM STRING_SPLIT(@SelectedCartItemIds, ',');  
  
    -- Select items to checkout  
    DECLARE @TotalAmount DECIMAL(18,2); 
    
    SELECT @TotalAmount = SUM(sc.Quantity * pv.Price)  
    FROM ShoppingCarts sc  
    INNER JOIN @Ids i ON sc.CartId = i.CartId
    INNER JOIN ProductVariants pv ON sc.VariantId = pv.VariantId 
    WHERE sc.UserId = @UserId;  

            IF @TotalAmount IS NULL
            THROW 50001, 'No valid cart items selected.', 1;
  
    -- Create Order  
    DECLARE @OrderId INT; 
    
    INSERT INTO Orders (UserId,ShippingName,ShippingAddress,ShippingCity,ShippingPhone,TotalAmount,paymentMethodId, PaymentStatus, CreatedAt)
    VALUES (@UserId, @ShippingName,@ShippingAddress,@ShippingCity,@ShippingPhone, @TotalAmount,1, 'PendingPayment', GETDATE()); 
  
    SET @OrderId = SCOPE_IDENTITY();  
  
    -- Insert into OrderItems  
    INSERT INTO OrderItems(OrderId,ProductId, VariantId, Quantity, UnitPrice)  
    SELECT @OrderId,pv.ProductId, sc.VariantId, sc.Quantity, pv.Price  
    FROM ShoppingCarts sc  
    INNER JOIN @Ids i ON sc.CartId = i.CartId
    JOIN ProductVariants pv ON sc.VariantId = pv.VariantId  
    WHERE sc.UserId = @UserId;  
  
    -- Update stock  
    UPDATE pv  
    SET pv.StockQuantity = pv.StockQuantity - sc.Quantity  
    FROM ProductVariants pv  
    INNER JOIN ShoppingCarts sc ON pv.VariantId = sc.VariantId  
    INNER JOIN @Ids i ON sc.CartId = i.CartId 
    WHERE sc.UserId = @UserId;  
  
    -- Remove items from cart  
    DELETE sc  
    FROM ShoppingCarts sc
    INNER JOIN @Ids i ON sc.CartId = i.CartId
    WHERE sc.UserId = @UserId;  
  
  COMMIT TRANSACTION;
    -- Return the OrderId and total  
    SELECT @OrderId AS OrderId, @TotalAmount AS TotalAmount;  
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        THROW;
    END CATCH
END  