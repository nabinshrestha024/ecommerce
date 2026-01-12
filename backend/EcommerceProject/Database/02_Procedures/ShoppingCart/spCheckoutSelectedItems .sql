USE ECommerceDB
Go

CREATE OR ALTER PROCEDURE spCheckoutSelectedItems
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
    SELECT CAST(value AS INT)
    FROM STRING_SPLIT(@SelectedCartItemIds, ',');

    -- Cart snapshot
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

        UnitDiscount DECIMAL(18,2) -- 🔥 per unit only
    );

    INSERT INTO @ShoppingCarts
    SELECT
        sc.CartId,
        p.ProductId,
        sc.VariantId,
        sc.Quantity,
        pv.Price,

        COALESCE(vd.DiscountId, pd.DiscountId),
        COALESCE(vd.DiscountName, pd.DiscountName),
        COALESCE(vd.DiscountType, pd.DiscountType),
        COALESCE(vd.DiscountValue, pd.DiscountValue),

        -- ✅ Per-unit discount ONLY
        CASE
            WHEN COALESCE(vd.DiscountType, pd.DiscountType) = 'Flat'
                THEN COALESCE(vd.DiscountValue, pd.DiscountValue)
            WHEN COALESCE(vd.DiscountType, pd.DiscountType) = 'Percentage'
                THEN pv.Price * COALESCE(vd.DiscountValue, pd.DiscountValue) / 100
            ELSE 0
        END AS DiscountAmount
    FROM ShoppingCarts sc
    INNER JOIN @Ids i ON sc.CartId = i.CartId
    INNER JOIN ProductVariants pv ON sc.VariantId = pv.VariantId
    INNER JOIN Products p ON pv.ProductId = p.ProductId

    OUTER APPLY (
    SELECT TOP 1 d.*
    FROM Discounts d
    INNER JOIN DiscountVariants dv ON dv.DiscountId = d.DiscountId
    WHERE dv.VariantId = sc.VariantId
      AND d.IsActive = 1
      AND GETDATE() BETWEEN d.StartDate AND d.EndDate
    ORDER BY d.DiscountValue DESC
) vd

    OUTER APPLY (
    SELECT TOP 1 d.*
    FROM Discounts d
    INNER JOIN DiscountProducts dp ON dp.DiscountId = d.DiscountId
    WHERE dp.ProductId = p.ProductId
      AND d.IsActive = 1
      AND GETDATE() BETWEEN d.StartDate AND d.EndDate
    ORDER BY d.DiscountValue DESC
) pd

    -- Totals
    DECLARE
        @TotalAmount DECIMAL(18,2),
        @DiscountTotal DECIMAL(18,2),
        @GrandTotal DECIMAL(18,2);

    SELECT
        @TotalAmount = SUM(UnitPrice * Quantity),
        @DiscountTotal = SUM(UnitDiscount * Quantity)
    FROM @ShoppingCarts;

    IF @TotalAmount IS NULL
        THROW 50001, 'No valid cart items selected.', 1;

    SET @GrandTotal = @TotalAmount - ISNULL(@DiscountTotal, 0);

    -- Insert Order
    DECLARE @OrderId INT;

    INSERT INTO Orders
    (
        UserId,
        ShippingName,
        ShippingAddress,
        ShippingCity,
        ShippingPhone,
        TotalAmount,
        DiscountTotal,
        GrandTotal,
        PaymentMethodId,
        PaymentStatus,
        CreatedAt
    )
    VALUES
    (
        @UserId,
        @ShippingName,
        @ShippingAddress,
        @ShippingCity,
        @ShippingPhone,
        @TotalAmount,
        @DiscountTotal,
        @GrandTotal,
        1,
        'Pending',
        GETDATE()
    );

    SET @OrderId = SCOPE_IDENTITY();

    -- Insert Order Items (snapshot)
    INSERT INTO OrderItems
    (
        OrderId,
        ProductId,
        VariantId,
        Quantity,
        UnitPrice,
        DiscountId,
        DiscountName,
        DiscountType,
        DiscountValue,
        DiscountAmount,
        FinalPrice
    )
    SELECT
        @OrderId,
        ProductId,
        VariantId,
        Quantity,
        UnitPrice,
        DiscountId,
        DiscountName,
        DiscountType,
        DiscountValue,
        UnitDiscount * Quantity,
        (UnitPrice * Quantity) - (UnitDiscount * Quantity)
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

    -- Return response
    SELECT
        @OrderId AS OrderId,
        @TotalAmount AS TotalAmount,
        @DiscountTotal AS DiscountTotal,
        @GrandTotal AS GrandTotal;
END
