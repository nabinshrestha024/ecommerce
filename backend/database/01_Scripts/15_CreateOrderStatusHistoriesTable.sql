USE [EcommerceDB];
GO

IF OBJECT_ID(N'sales.OrderStatusHistories', N'U') IS NOT NULL
    DROP TABLE sales.OrderStatusHistories;
GO

CREATE TABLE sales.OrderStatusHistories (
OrderStatusHistoryId    INT IDENTITY(1,1) PRIMARY KEY,
OrderId                 INT NOT NULL,
OldStatus               SMALLINT NULL,
NewStatus               SMALLINT NOT NULL,
ChangedBy               VARCHAR(200) NULL,
ChangedAt               DATETIME2(3) NOT NULL DEFAULT SYSUTCDATETIME(),
Notes                   VARCHAR(1000) NULL,
CONSTRAINT FK_OrderStatusHist_Order FOREIGN KEY (OrderId) REFERENCES sales.Orders(OrderId) ON DELETE CASCADE
);
CREATE INDEX IX_OrderStatusHist_OrderId ON sales.OrderStatusHistories(OrderId);
GO

PRINT 'Table sales.OrderStatusHistories created successfully.';
GO