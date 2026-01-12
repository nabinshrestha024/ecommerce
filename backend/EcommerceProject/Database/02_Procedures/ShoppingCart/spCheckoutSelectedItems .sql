USE [EcommerceDB]
GO

CREATE OR ALTER PROCEDURE [dbo].[spCheckoutSelectedItems]
    @UserId INT,
    @SelectedCartItemIds NVARCHAR(MAX),
    @ShippingName NVARCHAR(100),
    @ShippingAddress NVARCHAR(200),
    @ShippingCity NVARCHAR(100),
    @ShippingPhone NVARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON;

    -- Convert CSV to table
    DECLARE @Ids TABLE (CartId INT);
    INSERT INTO @Ids(CartId)
    SELECT value FROM STRING_SPLIT(@SelectedCartItemIds, ',');

    -- Get cart items and calculate discounts
    DECLARE @ShoppingCarts TABLE (
        CartId INT,
        ProductId INT,
        VariantId INT,
        Quantity INT,
        UnitPrice DECIMAL(18,2),
        DiscountId INT,
        DiscountName NVARCHAR(100),
        DiscountType NVARCHAR(20),
        DiscountValue DECIMAL(18,2),
        DiscountAmount DECIMAL(18,2),
        FinalPrice DECIMAL(18,2)
    );

    INSERT INTO @ShoppingCarts
    SELECT
        sc.CartId,
        p.ProductId,
        sc.VariantId,
        sc.Quantity,
        pv.Price AS UnitPrice,
        COALESCE(vd.DiscountId, pd.DiscountId) AS DiscountId,
        COALESCE(vd.DiscountName, pd.DiscountName) AS DiscountName,
        COALESCE(vd.DiscountType, pd.DiscountType) AS DiscountType,
        COALESCE(vd.DiscountValue, pd.DiscountValue) AS DiscountValue,
        CASE
            WHEN COALESCE(vd.DiscountType, pd.DiscountType) = 'Flat'
                THEN COALESCE(vd.DiscountValue, pd.DiscountValue)
            WHEN COALESCE(vd.DiscountType, pd.DiscountType) = 'Percentage'
                THEN pv.Price * COALESCE(vd.DiscountValue, pd.DiscountValue) / 100
            ELSE 0
        END AS DiscountAmount,
        CASE
            WHEN COALESCE(vd.DiscountType, pd.DiscountType) = 'Flat'
                THEN pv.Price - COALESCE(vd.DiscountValue, pd.DiscountValue)
            WHEN COALESCE(vd.DiscountType, pd.DiscountType) = 'Percentage'
                THEN pv.Price - (pv.Price * COALESCE(vd.DiscountValue, pd.DiscountValue)/100)
            ELSE pv.Price
        END AS FinalPrice
    FROM ShoppingCarts sc
    INNER JOIN @Ids i ON sc.CartId = i.CartId
    INNER JOIN ProductVariants pv ON sc.VariantId = pv.VariantId
    INNER JOIN Products p ON pv.ProductId = p.ProductId
    OUTER APPLY (
        SELECT TOP 1 d.*
        FROM DiscountAssigns da
        INNER JOIN Discounts d ON d.DiscountId = da.DiscountId
        WHERE da.VariantId = sc.VariantId AND d.IsActive = 1
        AND GETDATE() BETWEEN d.StartDate AND d.EndDate
        ORDER BY d.DiscountValue ASC
    ) vd
    OUTER APPLY (
        SELECT TOP 1 d.*
        FROM DiscountAssigns da
        INNER JOIN Discounts d ON d.DiscountId = da.DiscountId
        WHERE da.ProductId = p.ProductId AND d.IsActive = 1
        AND GETDATE() BETWEEN d.StartDate AND d.EndDate
        ORDER BY d.DiscountValue ASC
    ) pd;

    -- Calculate totals
    DECLARE @TotalAmount DECIMAL(18,2) = 0,
            @DiscountTotal DECIMAL(18,2) = 0,
            @GrandTotal DECIMAL(18,2) = 0;

    SELECT
        @TotalAmount = SUM(UnitPrice * Quantity),
        @DiscountTotal = SUM(DiscountAmount * Quantity),
        @GrandTotal = SUM(FinalPrice * Quantity)
    FROM @ShoppingCarts;

    IF @TotalAmount IS NULL
        THROW 50001, 'No valid cart items selected.', 1;

    -- Insert Order
    DECLARE @OrderId INT;
    INSERT INTO Orders
    (UserId, ShippingName, ShippingAddress, ShippingCity, ShippingPhone, TotalAmount, DiscountTotal, GrandTotal, PaymentMethodId, PaymentStatus, CreatedAt)
    VALUES
    (@UserId, @ShippingName, @ShippingAddress, @ShippingCity, @ShippingPhone, @TotalAmount, @DiscountTotal, @GrandTotal, 1, 'Pending', GETDATE());

    SET @OrderId = SCOPE_IDENTITY();

    -- Insert OrderItems
    INSERT INTO OrderItems
    (OrderId, ProductId, VariantId, Quantity, UnitPrice, DiscountId, DiscountName, DiscountType, DiscountValue, DiscountAmount, FinalPrice)
    SELECT
        @OrderId, ProductId, VariantId, Quantity, UnitPrice, DiscountId, DiscountName, DiscountType, DiscountValue, DiscountAmount, FinalPrice
    FROM @ShoppingCarts;

    -- Update stock
    UPDATE pv
    SET pv.StockQuantity = pv.StockQuantity - sc.Quantity
    FROM ProductVariants pv
    INNER JOIN @ShoppingCarts sc ON pv.VariantId = sc.VariantId;

    -- Remove purchased cart items
    DELETE sc
    FROM ShoppingCarts sc
    INNER JOIN @Ids i ON sc.CartId = i.CartId;

    -- Return summary
    SELECT @OrderId AS OrderId,
           @TotalAmount AS TotalAmount,
           @DiscountTotal AS DiscountTotal,
           @GrandTotal AS GrandTotal;
END
GO
