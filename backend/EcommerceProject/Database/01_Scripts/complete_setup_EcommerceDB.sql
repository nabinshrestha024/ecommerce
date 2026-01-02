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
    Status           SMALLINT NOT NULL DEFAULT 1, -- Active, Inactive, Banned
    ProfileImageUrl  VARCHAR(1024) NULL,
    Phone            VARCHAR(20) NULL,
    Address          VARCHAR(500) NULL,
    City             VARCHAR(100) NULL,
    Role             BIT NOT NULL DEFAULT 1, -- Admin = 1, Customer = 0
    RefreshToken     VARCHAR(500) NULL,
    AccessToken      VARCHAR(500) NULL,
    IsActive         BIT NOT NULL DEFAULT 1,
    CreatedAt        DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt        DATETIME2(3) NULL,
    DeletedAt        DATETIME2(3) NULL
);
PRINT 'Table Users created.';
GO

CREATE TABLE UserProfiles (
    UserId              INT PRIMARY KEY,
    DateOfBirth         DATE NULL,
    Gender              VARCHAR(20) NULL,
    Bio                 VARCHAR(500) NULL,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
);
PRINT 'Table UserProfiles created.';
GO

CREATE TABLE UserSocialLinks (
    SocialLinkId    INT IDENTITY(1,1) PRIMARY KEY,
    UserId          INT NOT NULL,
    Platform        VARCHAR(50) NOT NULL,
    ProfileLinkUrl      VARCHAR(300) NOT NULL,
    CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE
);
PRINT 'Table UserSocialLinks created.';
GO

CREATE TABLE Categories (
    CategoryId          INT IDENTITY(1,1) PRIMARY KEY,
    Name                VARCHAR(300) NOT NULL,
    Slug                VARCHAR(300) NOT NULL UNIQUE,
    CategoryImageURL    VARCHAR(500) NULL,
    Description         VARCHAR(1000) NULL,
    IsFeatured          BIT NOT NULL DEFAULT 0,
    SortOrder           INT DEFAULT 0,
    IsActive            BIT NOT NULL DEFAULT 1,
    CreatedAt           DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
);
PRINT 'Table Categories created.';
GO

CREATE TABLE Products (
    ProductId           INT IDENTITY(1,1) PRIMARY KEY,
    CategoryId          INT NOT NULL,
    Name                VARCHAR(200) NOT NULL,
    Slug                VARCHAR(200) NOT NULL UNIQUE,
    Description         VARCHAR(MAX) NULL,
    ShortDescription    VARCHAR(500) NULL,
    -- Price               DECIMAL(10,2) NOT NULL,
    -- StockQuantity       INT DEFAULT 0,
    -- SKU                 VARCHAR(50) NOT NULL UNIQUE,
    IsActive            BIT NOT NULL DEFAULT 1,
    CreatedAt           DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt           DATETIME2(3) NULL,
    FOREIGN KEY (CategoryId) REFERENCES Categories(CategoryId) ON DELETE NO ACTION
);
PRINT 'Table Products created.';
GO

CREATE TABLE ProductImages (
    ProductImageId     INT IDENTITY(1,1) PRIMARY KEY,
    ProductId          INT NOT NULL,
    ImageUrl           VARCHAR(500) NOT NULL,
    IsPrimary          BIT NOT NULL DEFAULT 0,
    SortOrder          INT DEFAULT 0,
    CreatedAt          DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE
);
PRINT 'Table ProductImages created.';
GO

CREATE TABLE PaymentMethods (
    PaymentMethodId INT IDENTITY(1,1) PRIMARY KEY,
    Name            VARCHAR(50) NOT NULL,
    Code            VARCHAR(20) NOT NULL UNIQUE,
    IsActive        BIT NOT NULL DEFAULT 1,
    CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
);
PRINT 'Table PaymentMethods created.';
GO

INSERT INTO PaymentMethods (Name, Code)
VALUES
('eSewa', 'esewa'),
('Khalti', 'khalti'),
('Cash on Delivery', 'cod');
GO

CREATE TABLE Orders (
    OrderId         INT IDENTITY(1001,1) PRIMARY KEY,
    UserId          INT NOT NULL,
    OrderDate       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    TotalAmount     DECIMAL(10,2) NOT NULL,
    Status          VARCHAR(20) NOT NULL DEFAULT 'Pending',

    ShippingName    VARCHAR(100) NULL,
    ShippingAddress VARCHAR(300) NOT NULL,
    ShippingCity    VARCHAR(50) NOT NULL,
    ShippingPhone   VARCHAR(20) NOT NULL,

    PaymentMethodId INT NOT NULL,
    PaymentStatus   VARCHAR(20) NOT NULL DEFAULT 'Pending',
    PaymentGateway  VARCHAR(50) NULL,
    Notes           VARCHAR(500) NULL,
    CreatedAt       DATETIME2,
    UpdatedAt       DATETIME2,

    FOREIGN KEY (UserId) REFERENCES Users(UserId),
    FOREIGN KEY (PaymentMethodId) REFERENCES PaymentMethods(PaymentMethodId)
);
PRINT 'Table Orders created.';
GO

CREATE TABLE OrderItems (
    OrderItemId     INT IDENTITY(1,1) PRIMARY KEY,
    OrderId         INT NOT NULL,
    ProductId       INT NOT NULL,
    Quantity        INT NOT NULL,
    UnitPrice       DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);
PRINT 'Table OrderItems created.';
GO

CREATE TABLE Payments (
    PaymentId               INT IDENTITY(1,1) PRIMARY KEY,
    OrderId                 INT NOT NULL,
    PaymentDate             DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    Amount                  DECIMAL(10,2) NOT NULL,
    Status                  VARCHAR(20) NOT NULL DEFAULT 'Pending',
    PaymentMethod           VARCHAR(20) NOT NULL,
    PaymentStatus           VARCHAR(20) NOT NULL DEFAULT 'Pending',
    TransactionId           VARCHAR(200) NULL,
    PaymentGateway          VARCHAR(50) NULL,
    PaymentURL              VARCHAR(500) NULL,
    GatewayReference        VARCHAR(200) NULL,
    Metadata                VARCHAR(MAX) NULL,
    CreatedAt               DATETIME2,
    UpdatedAt               DATETIME2 NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId)
);
PRINT 'Table Payments created.';
GO

CREATE TABLE PaymentGatewayTransactions (
    Id                   INT IDENTITY(1,1) PRIMARY KEY,
    GatewayName          VARCHAR(200) NOT NULL,
    GatewayTransactionId VARCHAR(200) NULL,
    PaymentId            INT NOT NULL,
    TransactionId        VARCHAR(200) NOT NULL,
    Amount               DECIMAL(18,2) NOT NULL,
    Status               VARCHAR(50) NOT NULL,
    GatewayStatus        VARCHAR(100) NULL,
    RetryCount           INT NOT NULL DEFAULT 0,
    RawResponse          VARCHAR(MAX) NULL,
    CreatedAt            DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt            DATETIME2(3) NULL,
    FOREIGN KEY (PaymentId) REFERENCES Payments(PaymentId)
);
PRINT 'Table PaymentGatewayTransactions created.';
GO

CREATE TABLE Transactions (
    TransactionId  BIGINT IDENTITY(1,1) PRIMARY KEY,
    OrderId        INT NOT NULL,
    PaymentId      INT NULL,
    Type           VARCHAR(20) NOT NULL, -- Debit, Credit, Refund
    Amount         DECIMAL(18,2) NOT NULL,
    Currency       VARCHAR(10) DEFAULT 'NPR',
    Status         VARCHAR(20) NOT NULL,
    Reference      VARCHAR(200) NULL,
    CreatedAt      DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId),
    FOREIGN KEY (PaymentId) REFERENCES Payments(PaymentId)
);
PRINT 'Table Transactions created.';
GO

CREATE TABLE ShoppingCarts (
    CartId      INT IDENTITY(1,1) PRIMARY KEY,
    UserId      INT NOT NULL,
    ProductId   INT NOT NULL,
    Quantity    INT NOT NULL DEFAULT 1,
    AddedDate   DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE,
    UNIQUE (UserId, ProductId)
);
PRINT 'Table ShoppingCarts created.';
GO

CREATE TABLE Wishlists (
    WishlistId  INT IDENTITY(1,1) PRIMARY KEY,
    UserId      INT NOT NULL,
    ProductId   INT NOT NULL,
    AddedDate   DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId) ON DELETE CASCADE,
    UNIQUE (UserId, ProductId)
);
PRINT 'Table Wishlists created.';
GO

CREATE TABLE Notifications (
    NotificationId  INT IDENTITY(1,1) PRIMARY KEY,
    UserId          INT NULL,
    Title           VARCHAR(200) NOT NULL,
    Message         VARCHAR(500) NOT NULL,
    IsRead          BIT NOT NULL DEFAULT 0,
    CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    OrderId         INT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(UserId) ON DELETE SET NULL,
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE SET NULL
);
PRINT 'Table Notifications created.';
GO

CREATE TABLE Vendors (
    VendorId        INT IDENTITY(1,1) PRIMARY KEY,
    Name            VARCHAR(200) NOT NULL,
    ContactPerson   VARCHAR(100) NULL,
    Phone           VARCHAR(20) NULL,
    Email           VARCHAR(100) NULL,
    Address         VARCHAR(300) NULL,
    IsActive        BIT NOT NULL DEFAULT 1,
    CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME()
);
PRINT 'Table Vendors created.';
GO

CREATE TABLE PurchaseOrders (
    POId        INT IDENTITY(1001,1) PRIMARY KEY,
    VendorId    INT NOT NULL,
    OrderDate   DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    Status      VARCHAR(20) NOT NULL DEFAULT 'Pending',
    TotalAmount DECIMAL(10,2) NULL,
    Notes       VARCHAR(500) NULL,
    CreatedBy   INT NULL,
    FOREIGN KEY (VendorId) REFERENCES Vendors(VendorId),
    FOREIGN KEY (CreatedBy) REFERENCES Users(UserId)
);
PRINT 'Table PurchaseOrders created.';
GO

CREATE TABLE PurchaseOrderItems (
    POItemId            INT IDENTITY(1,1) PRIMARY KEY,
    POId                INT NOT NULL,
    ProductId           INT NOT NULL,
    Quantity            INT NOT NULL,
    UnitCost            DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (POId) REFERENCES PurchaseOrders(POId) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);
PRINT 'Table PurchaseOrderItems created.';
GO


CREATE TABLE WebsiteReviews (
    WebsiteReviewId BIGINT IDENTITY(1,1) PRIMARY KEY,
    UserId          INT NULL,
    Title           VARCHAR(250) NULL,
    Content         VARCHAR(4000) NULL,
    Rating          TINYINT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    IsDeleted       BIT NOT NULL DEFAULT 0,
    DeletedAt       DATETIME(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
PRINT 'Table WebsiteReviews created.';
GO

CREATE TABLE Reviews (
    ReviewId    BIGINT IDENTITY(1,1) PRIMARY KEY,
    ProductId   INT NOT NULL,
    UserId      INT NULL,
    Title       VARCHAR(250) NULL,
    Content     VARCHAR(4000) NULL,
    Rating      TINYINT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    CreatedAt   DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    IsDeleted   BIT NOT NULL DEFAULT 0,
    DeletedAt   DATETIME(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId),
    FOREIGN KEY (UserId) REFERENCES Users(UserId)
);
PRINT 'Table Reviews created.';
GO

CREATE TABLE SystemSettings (
    [Key]           VARCHAR(100) PRIMARY KEY,
    [Value]         VARCHAR(1000) NULL,
    UpdatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedBy       VARCHAR(100) NULL
);
PRINT 'Table SystemSettings created.';
GO


CREATE TABLE Shipments 
( 
ShipmentId		INT IDENTITY(1,1) PRIMARY KEY, 
OrderId			INT NOT NULL, 
Status			VARCHAR(30) NOT NULL DEFAULT 'Pending',
ShippedAt		DATETIME2(3) NULL, 
DeliveredAt		DATETIME2(3) NULL, 
ShippingCost	DECIMAL(10,2) NULL, 
Notes			VARCHAR(500) NULL, 
CreatedAt		DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(), 
UpdatedAt		DATETIME2(3) NULL, 
FOREIGN KEY (OrderId) REFERENCES Orders(OrderId) ON DELETE CASCADE 
);
PRINT 'Table Shipments created.';
GO

CREATE TABLE Discounts (
    DiscountId INT PRIMARY KEY IDENTITY,
    ProductId INT NOT NULL,
    DiscountType VARCHAR(20), 
    DiscountValue DECIMAL(10,2), 
    IsPercentage BIT,
    MinQuantity INT NULL, 
    StartDate DATETIME,
    EndDate DATETIME,
    MaxUsage INT NULL,
    PerUserLimit INT NULL,
    IsActive BIT DEFAULT 1,
    FOREIGN KEY (ProductId) REFERENCES Products(ProductId)
);

PRINT 'Table Discounttable created.';
GO

CREATE TABLE DiscountUsages (
    UsageId INT PRIMARY KEY IDENTITY,
    DiscountId INT,
    UserId INT,
    UsedDate DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (DiscountId) REFERENCES Discounts(DiscountId)
);
PRINT 'Table DiscountUsahes created.';
GO

CREATE TABLE PasswordResetOtps (
    OtpId INT IDENTITY PRIMARY KEY,
    UserId INT NOT NULL,
    OtpCode VARCHAR(6) NOT NULL,
    ExpiresAt DATETIME NOT NULL,
    IsUsed BIT DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETUTCDATE()
)
PRINT 'PASSWORD RESet COMPLETED SUCCESSFULLY';

CREATE TABLE PasswordResetToken
(
    UserId INT,
    Token VARCHAR(500),
    Expiry DATETIME,
    PRIMARY KEY(Token)
);
PRINT 'Table PasswordResetToken.';

PRINT 'DATABASE SETUP COMPLETED SUCCESSFULLY';

