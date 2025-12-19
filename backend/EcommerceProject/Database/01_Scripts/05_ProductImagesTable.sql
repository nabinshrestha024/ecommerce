USE [EcommerceDB];
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
