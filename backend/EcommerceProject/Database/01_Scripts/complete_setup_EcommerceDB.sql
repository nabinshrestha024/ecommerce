IF NOT EXISTS (SELECT name FROM master.dbo.sysdatabases WHERE name = N'EcommerceDB')
BEGIN
    CREATE DATABASE [EcommerceDB]; 
    PRINT 'Database EcommerceDB created successfully.';
END
ELSE
BEGIN
    PRINT 'Database EcommerceDB already exists.';
END
GO

USE [EcommerceDB];
GO

CREATE TABLE Users (
    UserId           INT IDENTITY(1,1) PRIMARY KEY,
    Email            VARCHAR(100) NOT NULL UNIQUE, 
    FullName         VARCHAR(100) NOT NULL,      
    PasswordHash     VARCHAR(MAX) NULL,                   
    Status           SMALLINT NOT NULL DEFAULT 1,   -- Active, Inactive, Banned  
    ProfileImageUrl  VARCHAR(1024) NULL,    
    Phone            VARCHAR(20) NULL,
    Address          VARCHAR(500) NULL,
    City             VARCHAR(100) NULL,
    Role             BIT NOT NULL DEFAULT 1, -- Admin = 0, Customer = 1
    IsActive         BIT NOT NULL DEFAULT 1,   
    CreatedAt        DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt        DATETIME2(3) NULL,
    DeletedAt        DATETIME2(3) NULL
);
PRINT 'Table Users created successfully.';
GO

CREATE TABLE Categories (
    CategoryId          INT IDENTITY(1,1) PRIMARY KEY,
    Name                VARCHAR(300) NOT NULL,
    Slug                VARCHAR(300) NULL,
    CategoryImageURL    VARCHAR(500) NULL,
    Description         VARCHAR(1000) NULL,
    IsFeatured          BIT NOT NULL DEFAULT 0,
    SortOrder           INT DEFAULT 0, 
    IsActive            BIT NOT NULL DEFAULT 1,
    CreatedAt           DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
);
PRINT 'Table Categories created successfully.';
GO

CREATE TABLE Products (
    ProductID           INT PRIMARY KEY IDENTITY(1,1),
    Name                VARCHAR(200) NOT NULL,
    Slug                VARCHAR(200) UNIQUE NOT NULL,
    Description         VARCHAR(MAX),
    ShortDescription    VARCHAR(500),
    Price               DECIMAL(10,2) NOT NULL,
    CategoryID          INT NOT NULL,
    StockQuantity       INT DEFAULT 0,
    SKU                 VARCHAR(50) UNIQUE NOT NULL,
    Brand               VARCHAR(100),
    ProductImageURL     VARCHAR(500),
    IsActive            BIT DEFAULT 1,
    CreatedAt           DATETIME DEFAULT GETDATE(),
    UpdatedAt           DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID) ON DELETE CASCADE
);
PRINT 'Table Products created successfully.';
GO

CREATE TABLE PaymentMethods (
    PaymentMethodID INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(50) NOT NULL,
    Code VARCHAR(20) NOT NULL UNIQUE,
    Description VARCHAR(500) NULL,
    IsActive BIT DEFAULT 1,
    SortOrder INT DEFAULT 0,
    Config NVARCHAR(MAX) NULL, -- JSON configuration
    CreatedAt DATETIME DEFAULT GETDATE()
);
PRINT 'Table PaymentMethods created successfully.';

-- Insert default payment methods
INSERT INTO PaymentMethods (Name, Code, Description, IsActive, SortOrder) VALUES
('eSewa', 'esewa', 'Digital Wallet - eSewa', 1, 1),
('Khalti', 'khalti', 'Digital Wallet - Khalti', 1, 2),
('Cash on Delivery', 'cod', 'Cash on Delivery', 1, 3);
PRINT 'Default payment methods inserted.';
GO

CREATE TABLE Orders (
    OrderID         INT PRIMARY KEY IDENTITY(1001,1),
    UserID          INT NOT NULL,
    OrderDate       DATETIME DEFAULT GETDATE(),
    TotalAmount     DECIMAL(10,2) NOT NULL,
    Status          VARCHAR(20) DEFAULT 'Pending',
    
    -- shipping address (snapshot at time of order)
    ShippingName    VARCHAR(100),
    ShippingAddress VARCHAR(300) NOT NULL,
    ShippingCity    VARCHAR(50) NOT NULL,
    ShippingPhone   VARCHAR(20) NOT NULL,
    
    PaymentMethod   VARCHAR(20) NOT NULL DEFAULT 'cod',
    PaymentStatus   VARCHAR(20) DEFAULT 'Pending',
    PaymentGateway  VARCHAR(50) NULL, -- eSewa, Khalti, etc.
    
    Notes           VARCHAR(500),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
PRINT 'Table Orders created successfully.';
GO

CREATE TABLE OrderItems (
    OrderItemID     INT PRIMARY KEY IDENTITY(1,1),
    OrderID         INT NOT NULL,
    ProductID       INT NOT NULL,
    ProductName     VARCHAR(200) NOT NULL,
    Quantity        INT NOT NULL,
    UnitPrice       DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
PRINT 'Table OrderItems created successfully.';
GO

CREATE TABLE Payments (
    PaymentID               INT PRIMARY KEY IDENTITY(1,1),
    OrderID                 INT NOT NULL,
    PaymentDate             DATETIME DEFAULT GETDATE(),
    Amount                  DECIMAL(10,2) NOT NULL,
    PaymentMethod           VARCHAR(20) NOT NULL,
    PaymentStatus           VARCHAR(20) DEFAULT 'Pending',
    TransactionID           VARCHAR(200) NULL, 
    PaymentGateway          VARCHAR(50) NULL,  
    PaymentURL              VARCHAR(500) NULL, 
    PaymentProviderReference VARCHAR(200) NULL, 
    Metadata                NVARCHAR(MAX) NULL,
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);
PRINT 'Table Payments created successfully.';
GO

CREATE TABLE PaymentLogs (
    LogID BIGINT PRIMARY KEY IDENTITY(1,1),
    PaymentID INT NULL,
    OrderID INT NULL,
    EventType VARCHAR(50) NOT NULL, -- Initiated, Callback, Verification, etc.
    PaymentGateway VARCHAR(50) NULL,
    RequestData NVARCHAR(MAX) NULL,
    ResponseData NVARCHAR(MAX) NULL,
    Status VARCHAR(50) NULL,
    ErrorMessage VARCHAR(1000) NULL,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (PaymentID) REFERENCES Payments(PaymentID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);
PRINT 'Table PaymentLogs created successfully.';
GO

CREATE TABLE ShoppingCarts (
    CartID      INT PRIMARY KEY IDENTITY(1,1),
    UserID      INT NOT NULL,
    ProductID   INT NOT NULL,
    Quantity    INT NOT NULL DEFAULT 1,
    AddedDate   DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID) ON DELETE CASCADE,
    UNIQUE (UserID, ProductID)
);
PRINT 'Table ShoppingCarts created successfully.';
GO

CREATE TABLE Wishlists (
    WishlistID      INT PRIMARY KEY IDENTITY(1,1),
    UserID          INT NOT NULL,
    ProductID       INT NOT NULL,
    AddedDate       DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID),
    UNIQUE (UserID, ProductID)
);
PRINT 'Table Wishlists created successfully.';
GO

CREATE TABLE Notifications (
    NotificationID      INT PRIMARY KEY IDENTITY(1,1),
    UserID              INT NULL,
    Title               VARCHAR(200) NOT NULL,
    Message             VARCHAR(500) NOT NULL,
    IsRead              BIT DEFAULT 0,
    CreatedAt           DATETIME DEFAULT GETDATE(),
    OrderID             INT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);
PRINT 'Table Notifications created successfully.';
GO

CREATE TABLE Vendors (
    VendorID        INT PRIMARY KEY IDENTITY(1,1),
    Name            VARCHAR(200) NOT NULL,
    ContactPerson   VARCHAR(100),
    Phone           VARCHAR(20),
    Email           VARCHAR(100),
    Address         VARCHAR(300),
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME DEFAULT GETDATE()
);
PRINT 'Table Vendors created successfully.';
GO

CREATE TABLE PurchaseOrders (
    POID            INT PRIMARY KEY IDENTITY(1001,1),
    VendorID        INT NOT NULL,
    OrderDate       DATETIME DEFAULT GETDATE(),
    Status          VARCHAR(20) DEFAULT 'Pending',
    TotalAmount     DECIMAL(10,2),
    Notes           VARCHAR(500),
    CreatedBy       INT,
    FOREIGN KEY (VendorID) REFERENCES Vendors(VendorID),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserID)
);
PRINT 'Table PurchaseOrders created successfully.';
GO

CREATE TABLE PurchaseOrderItems (
    POItemID    INT PRIMARY KEY IDENTITY(1,1),
    POID        INT NOT NULL,
    ProductID   INT NOT NULL,
    Quantity    INT NOT NULL,
    UnitCost    DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (POID) REFERENCES PurchaseOrders(POID) ON DELETE CASCADE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
PRINT 'Table PurchaseOrderItems created successfully.';
GO

CREATE TABLE Reviews (
    ReviewId        BIGINT IDENTITY(1,1) PRIMARY KEY,
    ProductId       INT NOT NULL,
    UserId          INT NULL,
    Title           VARCHAR(250) NULL,
    Content         VARCHAR(4000) NULL,
    Rating          TINYINT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    CONSTRAINT FK_Reviews_Product FOREIGN KEY (ProductId) REFERENCES Products(ProductId),
    CONSTRAINT FK_Reviews_User FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
PRINT 'Table Reviews created successfully.';
GO

PRINT 'DATABASE SETUP COMPLETED SUCCESSFULLY';

-- List all created tables
SELECT 
    TABLE_NAME,
    'Created' as Status
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_CATALOG = 'EcommerceDB' 
    AND TABLE_TYPE = 'BASE TABLE'
ORDER BY TABLE_NAME;

DECLARE @TableCount INT;
SELECT @TableCount = COUNT(*) 
FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_CATALOG = 'EcommerceDB' 
    AND TABLE_TYPE = 'BASE TABLE';

PRINT 'Total tables created: ' + CAST(@TableCount AS VARCHAR(10));
GO