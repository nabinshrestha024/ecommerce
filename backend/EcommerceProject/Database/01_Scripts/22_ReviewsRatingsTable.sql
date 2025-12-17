USE [EcommerceDB];
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
GO
PRINT 'Table Reviews created successfully.';
GO
