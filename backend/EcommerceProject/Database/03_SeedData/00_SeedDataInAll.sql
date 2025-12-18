USE [EcommerceDB];
GO

PRINT 'Insert mock data...';
GO

-- 1. Users
PRINT 'Inserting Users...';
INSERT INTO Users (Email, FullName, PasswordHash, Status, Phone, Address, City, Role) VALUES
('admin@shop.com', 'Admin User', '$2a$10$hash', 1, '9800000000', 'Admin Address', 'Kathmandu', 0),
('john@example.com', 'John Doe', '$2a$10$hash', 1, '9801111111', 'Baneshwor', 'Kathmandu', 1),
('jane@example.com', 'Jane Smith', '$2a$10$hash', 1, '9802222222', 'Patan', 'Lalitpur', 1);
PRINT 'Users inserted: ' + CAST(@@ROWCOUNT AS VARCHAR);

-- 2. Categories
PRINT 'Inserting Categories...';
INSERT INTO Categories (Name, Slug, Description, IsFeatured) VALUES
('Electronics', 'electronics', 'Electronic devices and gadgets', 1),
('Clothing', 'clothing', 'Men and women clothing', 0),
('Books', 'books', 'Books and stationery', 0);
PRINT 'Categories inserted: ' + CAST(@@ROWCOUNT AS VARCHAR);

-- 3. Products
PRINT 'Inserting Products...';
INSERT INTO Products (Name, Slug, Description, Price, CategoryID, StockQuantity, SKU, Brand) VALUES
('Smartphone X', 'smartphone-x', 'Latest smartphone model', 500.00, 1, 50, 'SKU001', 'TechBrand'),
('Wireless Headphones', 'wireless-headphones', 'Noise cancelling headphones', 150.00, 1, 100, 'SKU002', 'AudioTech'),
('T-Shirt', 't-shirt', 'Cotton t-shirt', 25.00, 2, 200, 'SKU003', 'ClothCo'),
('Programming Book', 'programming-book', 'Learn programming', 45.00, 3, 30, 'SKU004', 'TechBooks');
PRINT 'Products inserted: ' + CAST(@@ROWCOUNT AS VARCHAR);

-- 4. Vendors
PRINT 'Inserting Vendors...';
INSERT INTO Vendors (Name, ContactPerson, Phone, Email, Address) VALUES
('Tech Supplier Inc.', 'Raj Sharma', '9803333333', 'raj@tech.com', 'Teku, Kathmandu'),
('Clothing Wholesale', 'Sita Rai', '9804444444', 'sita@clothing.com', 'New Road, Kathmandu'),
('Book Distributors', 'Hari Kumar', '9805555555', 'hari@books.com', 'Putalisadak, Kathmandu');
PRINT 'Vendors inserted: ' + CAST(@@ROWCOUNT AS VARCHAR);

-- 5. Orders
PRINT 'Inserting Orders...';
INSERT INTO Orders (UserID, TotalAmount, Status, ShippingAddress, ShippingCity, ShippingPhone, ShippingName, PaymentMethod) VALUES
(2, 500.00, 'Delivered', 'Baneshwor', 'Kathmandu', '9801111111', 'John Doe', 'cod'),
(3, 175.00, 'Processing', 'Patan', 'Lalitpur', '9802222222', 'Jane Smith', 'esewa'),
(2, 70.00, 'Pending', 'Baneshwor', 'Kathmandu', '9801111111', 'John Doe', 'khalti');
PRINT 'Orders inserted: ' + CAST(@@ROWCOUNT AS VARCHAR);

-- 6. Order Items
PRINT 'Inserting Order Items...';
INSERT INTO OrderItems (OrderID, ProductID, ProductName, Quantity, UnitPrice) VALUES
(1001, 1, 'Smartphone X', 1, 500.00),
(1002, 2, 'Wireless Headphones', 1, 150.00),
(1002, 3, 'T-Shirt', 1, 25.00),
(1003, 3, 'T-Shirt', 2, 25.00),
(1003, 4, 'Programming Book', 1, 45.00);
PRINT 'Order Items inserted: ' + CAST(@@ROWCOUNT AS VARCHAR);

-- 7. Payments
PRINT 'Inserting Payments...';
INSERT INTO Payments (OrderID, Amount, PaymentMethod, PaymentStatus, TransactionID) VALUES
(1001, 500.00, 'cod', 'Completed', 'TXN001'),
(1002, 175.00, 'esewa', 'Completed', 'TXN002'),
(1003, 70.00, 'khalti', 'Pending', 'TXN003');
PRINT 'Payments inserted: ' + CAST(@@ROWCOUNT AS VARCHAR);

-- 8. Shopping Cart items
PRINT 'Inserting Shopping Cart items...';
INSERT INTO ShoppingCarts (UserID, ProductID, Quantity) VALUES
(2, 2, 1),
(3, 1, 1),
(2, 4, 2);
PRINT 'Shopping Cart items inserted: ' + CAST(@@ROWCOUNT AS VARCHAR);

-- 9. Wishlist items
PRINT 'Inserting Wishlist items...';
INSERT INTO Wishlists (UserID, ProductID) VALUES
(2, 1),
(3, 3),
(2, 3);
PRINT 'Wishlist items inserted: ' + CAST(@@ROWCOUNT AS VARCHAR);

-- 10. Notifications
PRINT 'Inserting Notifications...';
INSERT INTO Notifications (UserID, Title, Message, OrderID) VALUES
(2, 'Order Delivered', 'Your order #1001 has been delivered', 1001),
(3, 'Order Confirmed', 'Your order #1002 is being processed', 1002),
(2, 'Payment Pending', 'Payment for order #1003 is pending', 1003);
PRINT 'Notifications inserted: ' + CAST(@@ROWCOUNT AS VARCHAR);

-- 11. Purchase Orders
PRINT 'Inserting Purchase Orders...';
INSERT INTO PurchaseOrders (VendorID, Status, TotalAmount, CreatedBy) VALUES
(1, 'Completed', 10000.00, 1),
(2, 'Processing', 5000.00, 1),
(3, 'Pending', 3000.00, 1);
PRINT 'Purchase Orders inserted: ' + CAST(@@ROWCOUNT AS VARCHAR);

-- 12. Purchase Order Items
PRINT 'Inserting Purchase Order Items...';
INSERT INTO PurchaseOrderItems (POID, ProductID, Quantity, UnitCost) VALUES
(1001, 1, 20, 450.00),
(1001, 2, 50, 120.00),
(1002, 3, 100, 20.00),
(1003, 4, 50, 35.00);
PRINT 'Purchase Order Items inserted: ' + CAST(@@ROWCOUNT AS VARCHAR);

-- 13. Reviews
PRINT 'Inserting Reviews...';
INSERT INTO Reviews (ProductId, UserId, Title, Content, Rating) VALUES
(1, 2, 'Great Phone!', 'Excellent smartphone, fast and reliable', 5),
(2, 3, 'Good Headphones', 'Sound quality is good, battery life could be better', 4),
(3, 2, 'Comfortable T-Shirt', 'Very comfortable, good material', 4);
PRINT 'Reviews inserted: ' + CAST(@@ROWCOUNT AS VARCHAR);

-- 14. Payment Logs
PRINT 'Inserting Payment Logs...';
INSERT INTO PaymentLogs (PaymentID, OrderID, EventType, PaymentGateway, Status) VALUES
(1, 1001, 'Completed', 'COD', 'Success'),
(2, 1002, 'Completed', 'eSewa', 'Success'),
(3, 1003, 'Initiated', 'Khalti', 'Pending');
PRINT 'Payment Logs inserted: ' + CAST(@@ROWCOUNT AS VARCHAR);

-- Re-enable foreign key constraints
EXEC sp_MSforeachtable "ALTER TABLE ? WITH CHECK CHECK CONSTRAINT all";
GO

PRINT 'Mock data insertion completed successfully!';
GO

-- Display counts for verification
PRINT CHAR(10) + 'Data Counts Summary:';
PRINT '-------------------';

DECLARE @tableName NVARCHAR(128);
DECLARE @sql NVARCHAR(MAX);

DECLARE tableCursor CURSOR FOR
SELECT TABLE_NAME 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_CATALOG = 'EcommerceDB' 
    AND TABLE_TYPE = 'BASE TABLE'
    AND TABLE_NAME NOT LIKE 'sys%'
ORDER BY TABLE_NAME;

OPEN tableCursor;
FETCH NEXT FROM tableCursor INTO @tableName;

WHILE @@FETCH_STATUS = 0
BEGIN
    SET @sql = 'PRINT ''' + @tableName + ': '' + CAST((SELECT COUNT(*) FROM ' + @tableName + ') AS VARCHAR)';
    EXEC sp_executesql @sql;
    FETCH NEXT FROM tableCursor INTO @tableName;
END

CLOSE tableCursor;
DEALLOCATE tableCursor;

PRINT 'All mock data has been inserted successfully!';
GO