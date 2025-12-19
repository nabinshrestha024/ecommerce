USE [EcommerceDB];
GO

INSERT INTO Users (Email, FullName, PasswordHash, Phone, City, Role)
VALUES
('admin@shop.com', 'Admin User', 'HASHED_ADMIN', '9800000001', 'Kathmandu', 0),
('user1@shop.com', 'Ram Sharma', 'HASHED_USER1', '9800000002', 'Lalitpur', 1),
('user2@shop.com', 'Sita Thapa', 'HASHED_USER2', '9800000003', 'Bhaktapur', 1);
GO

INSERT INTO UserProfiles (UserId, DateOfBirth, Gender, Bio)
VALUES
(2, '1998-05-12', 'Male', 'Tech enthusiast'),
(3, '1999-09-20', 'Female', 'Online shopping lover');
GO

INSERT INTO UserSocialLinks (UserId, Platform, ProfileUrl)
VALUES
(2, 'Facebook', 'https://facebook.com/'),
(2, 'LinkedIn', 'https://linkedin.com/in/'),
(3, 'Instagram', 'https://instagram.com/');
GO

INSERT INTO Categories (Name, Slug, Description, IsFeatured)
VALUES
('Electronics', 'electronics-1', 'Electronic gadgets and devices', 1),
('Clothing', 'clothing-1', 'Men and women clothing', 1),
('Books', 'books-1', 'Educational and non-fiction books', 0);
GO

INSERT INTO Products (CategoryId, Name, Slug, Price, StockQuantity, SKU)
VALUES
(1, 'Smartphone', 'smartphone-1', 25000, 50, 'ELEC-001'),
(1, 'Laptop', 'laptop-1', 85000, 20, 'ELEC-002'),
(2, 'T-Shirt', 'tshirt-1', 1200, 100, 'CLOT-001'),
(3, 'Engineering Math Book', 'eng-math-book-1', 900, 30, 'BOOK-001');
GO

INSERT INTO ProductImages (ProductId, ImageUrl, IsPrimary)
VALUES
(1, 'https://img.shop.com/phone.jpg', 1),
(2, 'https://img.shop.com/laptop.jpg', 1),
(3, 'https://img.shop.com/tshirt.jpg', 1),
(4, 'https://img.shop.com/book.jpg', 1);
GO

INSERT INTO Orders (
    UserId, TotalAmount, ShippingAddress, ShippingCity, ShippingPhone, PaymentMethodId
)
VALUES
(2, 26200, 'Pulchowk', 'Lalitpur', '9800000002', 1),
(3, 1200, 'Suryabinayak', 'Bhaktapur', '9800000003', 3);
GO

INSERT INTO OrderItems (OrderId, ProductId, Quantity, UnitPrice)
VALUES
(1001, 1, 1, 25000),
(1001, 4, 1, 1200),
(1002, 3, 1, 1200);
GO

INSERT INTO Payments (
    OrderId, Amount, PaymentMethod, PaymentGateway, TransactionId, Status
)
VALUES
(1001, 26200, 'esewa', 'eSewa', 'ESW123456', 'Completed'),
(1002, 1200, 'cod', NULL, NULL, 'Pending');
GO

INSERT INTO PaymentGatewayTransactions (
    GatewayName, PaymentId, TransactionId, Amount, Status
)
VALUES
('eSewa', 1, 'ESW123456', 26200, 'Success');
GO

INSERT INTO Transactions (
    OrderId, PaymentId, Type, Amount, Status
)
VALUES
(1001, 1, 'Debit', 26200, 'Completed'),
(1002, NULL, 'Debit', 1200, 'Pending');
GO

INSERT INTO ShoppingCarts (UserId, ProductId, Quantity)
VALUES
(2, 2, 1),
(3, 1, 1);
GO

INSERT INTO Wishlists (UserId, ProductId)
VALUES
(2, 3),
(3, 2);
GO

INSERT INTO Notifications (UserId, Title, Message, OrderId)
VALUES
(2, 'Order Placed', 'Your order #1001 has been placed.', 1001),
(3, 'Order Pending', 'Your COD order is pending.', 1002);
GO

INSERT INTO Vendors (Name, Phone, Email)
VALUES
('Samsung Nepal', '01-4444444', 'contact@samsung.com'),
('Local Books Supplier', '01-5555555', 'books@supplier.com');
GO

INSERT INTO PurchaseOrders (VendorId, TotalAmount, CreatedBy)
VALUES
(1, 170000, 1),
(2, 27000, 1);
GO

INSERT INTO PurchaseOrderItems (POId, ProductId, Quantity, UnitCost)
VALUES
(1001, 1, 10, 23000),
(1001, 2, 2, 80000),
(1002, 4, 30, 800);
GO

INSERT INTO Reviews (ProductId, UserId, Rating, Content)
VALUES
(1, 2, 5, 'Excellent phone for the price'),
(3, 3, 4, 'Comfortable T-shirt'),
(4, 2, 5, 'Very helpful for exams');
GO

PRINT 'SEED DATA INSERTED SUCCESSFULLY';
GO
