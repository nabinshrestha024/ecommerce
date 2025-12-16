USE [EcommerceDB];
GO
IF OBJECT_ID(N'catalog.Reviews', N'U') IS NOT NULL
    DROP TABLE catalog.Reviews;
GO
CREATE TABLE catalog.Reviews (
ReviewId        BIGINT IDENTITY(1,1) PRIMARY KEY,
ProductId       INT NOT NULL,
UserId          INT NULL,
Title           VARCHAR(250) NULL,
Content         VARCHAR(4000) NULL,
Rating          TINYINT NOT NULL CHECK (Rating BETWEEN 1 AND 5),
CreatedAt       DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
CONSTRAINT FK_Reviews_Product FOREIGN KEY (ProductId) REFERENCES catalog.Products(ProductId),
CONSTRAINT FK_Reviews_User FOREIGN KEY (UserId) REFERENCES dbo.Users(UserId)
);
GO
PRINT 'Table catalog.Reviews created successfully.';
GO
