USE EcommerceDB
GO

PRINT 'Running Product/spProducts_Create.sql'
GO

CREATE OR ALTER PROCEDURE spProducts_Create
    @Name NVARCHAR(200),
    @Slug VARCHAR(200),
    @Description NVARCHAR(MAX) = NULL,
    @ShortDescription NVARCHAR(500) = NULL,
    @Price DECIMAL(10,2),
    @CategoryID INT,
    @StockQuantity INT = 0,
    @SKU VARCHAR(50),
    @Brand NVARCHAR(100) = NULL,
    @ProductImageURL VARCHAR(500) = NULL,
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON

    INSERT INTO dbo.Products
    (Name, Slug, Description, ShortDescription, Price, CategoryID, StockQuantity, SKU, Brand, ProductImageURL, IsActive, CreatedAt, UpdatedAt)
    VALUES
    (@Name, @Slug, @Description, @ShortDescription, @Price, @CategoryID, @StockQuantity, @SKU, @Brand, @ProductImageURL, @IsActive, GETDATE(), GETDATE())

    SELECT CAST(SCOPE_IDENTITY() AS INT) AS ProductID
END
GO

PRINT 'Running Product/spProducts_GetById.sql'
GO

CREATE OR ALTER PROCEDURE spProducts_GetById
    @ProductID INT
AS
BEGIN
    SET NOCOUNT ON
    SELECT TOP 1 *
    FROM dbo.Products
    WHERE ProductID = @ProductID
END
GO

PRINT 'Running Product/spProducts_GetPaged.sql'
GO

CREATE OR ALTER PROCEDURE spProducts_GetPaged
    @Page           INT = 1,
    @PageSize       INT = 20,
    @Search         NVARCHAR(200) = NULL,
    @CategoryID     INT = NULL,
    @IsActive       BIT = NULL,
    @MinPrice       DECIMAL(10,2) = NULL,
    @MaxPrice       DECIMAL(10,2) = NULL,
    @SortBy         VARCHAR(20) = 'createdAt',
    @SortDir        VARCHAR(4)  = 'desc'
AS
BEGIN
    SET NOCOUNT ON

    IF (@Page < 1) SET @Page = 1
    IF (@PageSize < 1) SET @PageSize = 20

    ;WITH Q AS (
        SELECT p.*
        FROM dbo.Products p
        WHERE
            (@Search IS NULL OR p.Name LIKE '%' + @Search + '%' OR p.Slug LIKE '%' + @Search + '%' OR p.SKU LIKE '%' + @Search + '%')
            AND (@CategoryID IS NULL OR p.CategoryID = @CategoryID)
            AND (@IsActive IS NULL OR p.IsActive = @IsActive)
            AND (@MinPrice IS NULL OR p.Price >= @MinPrice)
            AND (@MaxPrice IS NULL OR p.Price <= @MaxPrice)
    ),
    C AS (
        SELECT COUNT(1) AS TotalCount FROM Q
    )
    SELECT
        q.ProductID, q.Name, q.Slug, q.Description, q.ShortDescription, q.Price,
        q.CategoryID, q.StockQuantity, q.SKU, q.Brand, q.ProductImageURL,
        q.IsActive, q.CreatedAt, q.UpdatedAt,
        c.TotalCount
    FROM Q q
    CROSS JOIN C c
    ORDER BY
        CASE WHEN @SortBy='price' AND @SortDir='asc'  THEN q.Price END ASC,
        CASE WHEN @SortBy='price' AND @SortDir='desc' THEN q.Price END DESC,
        CASE WHEN @SortBy='name'  AND @SortDir='asc'  THEN q.Name  END ASC,
        CASE WHEN @SortBy='name'  AND @SortDir='desc' THEN q.Name  END DESC,
        CASE WHEN @SortBy='createdAt' AND @SortDir='asc'  THEN q.CreatedAt END ASC,
        CASE WHEN @SortBy='createdAt' AND @SortDir='desc' THEN q.CreatedAt END DESC,
        q.ProductID DESC
    OFFSET (@Page - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY
END
GO

PRINT 'Running Product/spProducts_Update.sql'
GO

CREATE OR ALTER PROCEDURE spProducts_Update
    @ProductID INT,
    @Name NVARCHAR(200),
    @Slug VARCHAR(200),
    @Description NVARCHAR(MAX) = NULL,
    @ShortDescription NVARCHAR(500) = NULL,
    @Price DECIMAL(10,2),
    @CategoryID INT,
    @StockQuantity INT,
    @SKU VARCHAR(50),
    @Brand NVARCHAR(100) = NULL,
    @ProductImageURL VARCHAR(500) = NULL,
    @IsActive BIT
AS
BEGIN
    SET NOCOUNT ON

    UPDATE dbo.Products
    SET
        Name=@Name,
        Slug=@Slug,
        Description=@Description,
        ShortDescription=@ShortDescription,
        Price=@Price,
        CategoryID=@CategoryID,
        StockQuantity=@StockQuantity,
        SKU=@SKU,
        Brand=@Brand,
        ProductImageURL=@ProductImageURL,
        IsActive=@IsActive,
        UpdatedAt=GETDATE()
    WHERE ProductID=@ProductID

    SELECT @@ROWCOUNT AS Affected
END
GO

PRINT 'Running Vendor/spVendors_Create.sql'
GO

CREATE OR ALTER PROCEDURE spVendors_Create
    @Name VARCHAR(200),
    @ContactPerson VARCHAR(100) = NULL,
    @Phone VARCHAR(20) = NULL,
    @Email VARCHAR(100) = NULL,
    @Address VARCHAR(300) = NULL
AS
BEGIN
    SET NOCOUNT ON
    
    BEGIN TRY
        BEGIN TRANSACTION
        
        INSERT INTO Vendors (Name, ContactPerson, Phone, Email, Address, IsActive, CreatedAt)
        VALUES (@Name, @ContactPerson, @Phone, @Email, @Address, 1, GETDATE())
        
        SELECT 
            VendorID AS VendorId,
            Name,
            ContactPerson,
            Phone,
            Email,
            Address,
            IsActive,
            CreatedAt
        FROM Vendors
        WHERE VendorID = SCOPE_IDENTITY()
        
        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION
        THROW
    END CATCH
END
GO

PRINT 'Running Vendor/spVendors_Delete.sql'
GO

CREATE OR ALTER PROCEDURE spVendors_Delete
    @VendorId INT
AS
BEGIN
    SET NOCOUNT ON
    
    UPDATE Vendors 
    SET IsActive = 0 
    WHERE VendorID = @VendorId
    
    SELECT @@ROWCOUNT AS RowsAffected
END
GO

PRINT 'Running Vendor/spVendors_GetAll.sql'
GO

CREATE OR ALTER PROCEDURE spVendors_GetAll
    @IsActive BIT = NULL
AS
BEGIN
    SET NOCOUNT ON
    
    SELECT 
        VendorID AS VendorId,
        Name,
        ContactPerson,
        Phone,
        Email,
        Address,
        IsActive,
        CreatedAt
    FROM Vendors
    WHERE (@IsActive IS NULL OR IsActive = @IsActive)
    ORDER BY Name
END
GO

PRINT 'Running Vendor/spVendors_GetById.sql'
GO

CREATE OR ALTER PROCEDURE spVendors_GetById
    @VendorId INT
AS
BEGIN
    SET NOCOUNT ON
    
    SELECT 
        VendorID AS VendorId,
        Name,
        ContactPerson,
        Phone,
        Email,
        Address,
        IsActive,
        CreatedAt
    FROM Vendors
    WHERE VendorID = @VendorId
END
GO

PRINT 'Running Vendor/spVendors_Update.sql'
GO

CREATE OR ALTER PROCEDURE spVendors_Update
    @VendorId INT,
    @Name VARCHAR(200) = NULL,
    @ContactPerson VARCHAR(100) = NULL,
    @Phone VARCHAR(20) = NULL,
    @Email VARCHAR(100) = NULL,
    @Address VARCHAR(300) = NULL,
    @IsActive BIT = NULL
AS
BEGIN
    SET NOCOUNT ON
    
    BEGIN TRY
        BEGIN TRANSACTION
        
        UPDATE Vendors 
        SET 
            Name = ISNULL(@Name, Name),
            ContactPerson = ISNULL(@ContactPerson, ContactPerson),
            Phone = ISNULL(@Phone, Phone),
            Email = ISNULL(@Email, Email),
            Address = ISNULL(@Address, Address),
            IsActive = ISNULL(@IsActive, IsActive)
        WHERE VendorID = @VendorId
        
        SELECT 
            VendorID AS VendorId,
            Name,
            ContactPerson,
            Phone,
            Email,
            Address,
            IsActive,
            CreatedAt
        FROM Vendors
        WHERE VendorID = @VendorId
        
        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION
        THROW
    END CATCH
END
GO

PRINT 'Running Stock/spStock_Adjust.sql'
GO

CREATE OR ALTER PROCEDURE spStock_Adjust
    @ProductId INT,
    @AdjustmentQuantity INT,
    @Reason VARCHAR(200),
    @Notes VARCHAR(500) = NULL,
    @AdjustedBy INT
AS
BEGIN
    SET NOCOUNT ON
    
    BEGIN TRY
        BEGIN TRANSACTION
        
        DECLARE @CurrentStock INT
        DECLARE @NewStock INT
        DECLARE @ProductName VARCHAR(200)
        DECLARE @CategoryName VARCHAR(300)
        
        -- Get current stock, product name, and category
        SELECT 
            @CurrentStock = p.StockQuantity,
            @ProductName = p.Name,
            @CategoryName = c.Name
        FROM Products p
        LEFT JOIN Categories c ON p.CategoryID = c.CategoryID
        WHERE p.ProductID = @ProductId
        
        IF @CurrentStock IS NULL
        BEGIN
            RAISERROR('Product not found', 16, 1)
            RETURN
        END
        
        -- Calculate new stock
        SET @NewStock = @CurrentStock + @AdjustmentQuantity
        
        IF @NewStock < 0
        BEGIN
            RAISERROR('Stock cannot be negative', 16, 1)
            RETURN
        END
        
        -- Update product stock
        UPDATE Products 
        SET 
            StockQuantity = @NewStock,
            UpdatedAt = GETDATE()
        WHERE ProductID = @ProductId
        
        -- Return adjustment information
        SELECT 
            @ProductId AS ProductId,
            @ProductName AS ProductName,
            @AdjustmentQuantity AS AdjustmentQuantity,
            @CurrentStock AS PreviousStock,
            @NewStock AS NewStockLevel,
            @Reason AS Reason,
            @Notes AS Notes,
            @AdjustedBy AS AdjustedBy,
            GETDATE() AS AdjustedAt
        
        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION
        THROW
    END CATCH
END
GO

PRINT 'Running Stock/spStock_GetAll.sql'
GO

CREATE OR ALTER PROCEDURE spStock_GetAll
AS
BEGIN
    SET NOCOUNT ON
    
    SELECT 
        p.ProductID AS ProductId,
        p.Name AS ProductName,
        p.SKU,
        p.StockQuantity AS CurrentStock,
        10 AS ReorderLevel,
        p.Price,
        c.Name AS CategoryName,
        p.UpdatedAt AS LastUpdated,
        CASE 
            WHEN p.StockQuantity <= 10 THEN 'Low Stock'
            WHEN p.StockQuantity = 0 THEN 'Out of Stock'
            ELSE 'In Stock'
        END AS Status
    FROM Products p
    LEFT JOIN Categories c ON p.CategoryID = c.CategoryID
    WHERE p.IsActive = 1
    ORDER BY p.Name
END
GO

PRINT 'Running Stock/spStock_GetByProductId.sql'
GO

CREATE OR ALTER PROCEDURE spStock_GetByProductId
    @ProductId INT
AS
BEGIN
    SET NOCOUNT ON
    
    SELECT 
        p.ProductID AS ProductId,
        p.Name AS ProductName,
        p.SKU,
        p.StockQuantity AS CurrentStock,
        10 AS ReorderLevel,
        p.Price,
        c.Name AS CategoryName,
        p.UpdatedAt AS LastUpdated,
        CASE 
            WHEN p.StockQuantity <= 10 THEN 'Low Stock'
            WHEN p.StockQuantity = 0 THEN 'Out of Stock'
            ELSE 'In Stock'
        END AS Status
    FROM Products p
    LEFT JOIN Categories c ON p.CategoryID = c.CategoryID
    WHERE p.ProductID = @ProductId
        AND p.IsActive = 1
END
GO

PRINT 'Running Stock/spStock_GetLowStock.sql'
GO

CREATE OR ALTER PROCEDURE spStock_GetLowStock
AS
BEGIN
    SET NOCOUNT ON
    
    SELECT 
        p.ProductID AS ProductId,
        p.Name AS ProductName,
        p.SKU,
        p.StockQuantity AS CurrentStock,
        10 AS ReorderLevel,
        c.Name AS CategoryName,
        (SELECT MAX(o.OrderDate) 
         FROM OrderItems oi 
         INNER JOIN Orders o ON oi.OrderID = o.OrderID 
         WHERE oi.ProductID = p.ProductID) AS LastSoldDate
    FROM Products p
    LEFT JOIN Categories c ON p.CategoryID = c.CategoryID
    WHERE p.IsActive = 1 
        AND p.StockQuantity <= 10
    ORDER BY p.StockQuantity ASC, p.Name
END
GO

PRINT 'Running PurchaseOrder/spPurchaseOrderItems_GetByPOId.sql'
GO

CREATE OR ALTER PROCEDURE spPurchaseOrderItems_GetByPOId
    @POId INT
AS
BEGIN
    SET NOCOUNT ON
    
    SELECT 
        poi.POItemID AS POItemId,
        poi.POID AS POId,
        poi.ProductID AS ProductId,
        p.Name AS ProductName,
        p.SKU,
        poi.Quantity,
        poi.UnitCost,
        (poi.Quantity * poi.UnitCost) AS ItemTotal
    FROM PurchaseOrderItems poi
    INNER JOIN Products p ON poi.ProductID = p.ProductID
    WHERE poi.POID = @POId
END
GO

PRINT 'Running PurchaseOrder/spPurchaseOrders_Create.sql'
GO

CREATE OR ALTER PROCEDURE spPurchaseOrders_Create
    @VendorId INT,
    @Notes VARCHAR(500) = NULL,
    @CreatedBy INT,
    @ItemsJson NVARCHAR(MAX) 
AS
BEGIN
    SET NOCOUNT ON
    
    BEGIN TRY
        BEGIN TRANSACTION
        
        DECLARE @POId INT
        DECLARE @TotalAmount DECIMAL(10,2) = 0
        
        -- Calculate total amount from JSON
        SELECT @TotalAmount = SUM(Quantity * UnitCost)
        FROM OPENJSON(@ItemsJson)
        WITH (
            ProductId INT '$.ProductId',
            Quantity INT '$.Quantity',
            UnitCost DECIMAL(10,2) '$.UnitCost'
        )
        
        -- Create purchase order
        INSERT INTO PurchaseOrders (VendorID, OrderDate, Status, TotalAmount, Notes, CreatedBy)
        VALUES (@VendorId, GETDATE(), 'Pending', @TotalAmount, @Notes, @CreatedBy)
        
        SET @POId = SCOPE_IDENTITY()
        
        -- Insert order items
        INSERT INTO PurchaseOrderItems (POID, ProductID, Quantity, UnitCost)
        SELECT @POId, ProductId, Quantity, UnitCost
        FROM OPENJSON(@ItemsJson)
        WITH (
            ProductId INT '$.ProductId',
            Quantity INT '$.Quantity',
            UnitCost DECIMAL(10,2) '$.UnitCost'
        )
        
        -- Return created order
        EXEC spPurchaseOrders_GetById @POId
        
        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION
        THROW
    END CATCH
END
GO

PRINT 'Running PurchaseOrder/spPurchaseOrders_GetById.sql'
GO

CREATE OR ALTER PROCEDURE spPurchaseOrders_GetById
    @POId INT
AS
BEGIN
    SET NOCOUNT ON
    
    -- Return order header
    SELECT 
        po.POID AS POId,
        po.VendorID AS VendorId,
        v.Name AS VendorName,
        v.ContactPerson AS VendorContact,
        po.OrderDate,
        po.Status,
        po.TotalAmount,
        po.Notes,
        po.CreatedBy,
        u.FullName AS CreatedByName
    FROM PurchaseOrders po
    LEFT JOIN Vendors v ON po.VendorID = v.VendorID
    LEFT JOIN Users u ON po.CreatedBy = u.UserID
    WHERE po.POID = @POId
    
    -- Return order items
    SELECT 
        poi.POItemID AS POItemId,
        poi.POID AS POId,
        poi.ProductID AS ProductId,
        p.Name AS ProductName,
        p.SKU,
        poi.Quantity,
        poi.UnitCost,
        (poi.Quantity * poi.UnitCost) AS ItemTotal
    FROM PurchaseOrderItems poi
    INNER JOIN Products p ON poi.ProductID = p.ProductID
    WHERE poi.POID = @POId
END
GO

PRINT 'Running PurchaseOrder/spPurchaseOrders_GetPaged.sql'
GO

CREATE OR ALTER PROCEDURE spPurchaseOrders_GetPaged
    @PageNumber INT = 1,
    @PageSize INT = 10,
    @Status VARCHAR(20) = NULL,
    @VendorId INT = NULL
AS
BEGIN
    SET NOCOUNT ON
    
    DECLARE @Offset INT = (@PageNumber - 1) * @PageSize
    
    -- Get total count
    SELECT COUNT(*) AS TotalCount
    FROM PurchaseOrders po
    WHERE (@Status IS NULL OR po.Status = @Status)
        AND (@VendorId IS NULL OR po.VendorID = @VendorId)
    
    -- Get paginated data
    SELECT 
        po.POID AS POId,
        po.VendorID AS VendorId,
        v.Name AS VendorName,
        po.OrderDate,
        po.Status,
        po.TotalAmount,
        po.Notes,
        po.CreatedBy,
        u.FullName AS CreatedByName,
        (SELECT COUNT(*) FROM PurchaseOrderItems poi WHERE poi.POID = po.POID) AS ItemCount
    FROM PurchaseOrders po
    LEFT JOIN Vendors v ON po.VendorID = v.VendorID
    LEFT JOIN Users u ON po.CreatedBy = u.UserID
    WHERE (@Status IS NULL OR po.Status = @Status)
        AND (@VendorId IS NULL OR po.VendorID = @VendorId)
    ORDER BY po.OrderDate DESC
    OFFSET @Offset ROWS
    FETCH NEXT @PageSize ROWS ONLY
END
GO

PRINT 'Running PurchaseOrder/spPurchaseOrders_Receive.sql'
GO

CREATE OR ALTER PROCEDURE spPurchaseOrders_Receive
    @POId INT,
    @ReceivedBy INT,
    @ReceivedItemsJson NVARCHAR(MAX)  
AS
BEGIN
    SET NOCOUNT ON
    
    BEGIN TRY
        BEGIN TRANSACTION
        
        -- Check if PO exists and is approved
        IF NOT EXISTS (SELECT 1 FROM PurchaseOrders WHERE POID = @POId AND Status = 'Approved')
        BEGIN
            RAISERROR('Purchase order not found or not approved', 16, 1)
            RETURN
        END
        
        -- Update PO status
        UPDATE PurchaseOrders 
        SET Status = 'Received'
        WHERE POID = @POId
        
        -- Parse JSON and update stock
        UPDATE p
        SET p.StockQuantity = p.StockQuantity + ri.ReceivedQuantity,
            p.UpdatedAt = GETDATE()
        FROM Products p
        INNER JOIN PurchaseOrderItems poi ON p.ProductID = poi.ProductID
        INNER JOIN (
            SELECT 
                ProductId,
                ReceivedQuantity
            FROM OPENJSON(@ReceivedItemsJson)
            WITH (
                POItemId INT '$.POItemId',
                ReceivedQuantity INT '$.ReceivedQuantity'
            )
        ) ri ON poi.POItemID = ri.POItemId
        WHERE poi.POID = @POId
        
        -- Record stock adjustments if table exists
        IF OBJECT_ID('StockAdjustments', 'U') IS NOT NULL
        BEGIN
            INSERT INTO StockAdjustments (ProductID, AdjustmentQuantity, Reason, AdjustedBy, AdjustedAt)
            SELECT 
                poi.ProductID,
                ri.ReceivedQuantity,
                'Purchase Order Received - PO#' + CAST(@POId AS VARCHAR(10)),
                @ReceivedBy,
                GETDATE()
            FROM PurchaseOrderItems poi
            INNER JOIN (
                SELECT 
                    POItemId,
                    ReceivedQuantity
                FROM OPENJSON(@ReceivedItemsJson)
                WITH (
                    POItemId INT '$.POItemId',
                    ReceivedQuantity INT '$.ReceivedQuantity'
                )
            ) ri ON poi.POItemID = ri.POItemId
            WHERE poi.POID = @POId
        END
        
        -- Return updated order
        EXEC spPurchaseOrders_GetById @POId
        
        COMMIT TRANSACTION
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION
        THROW
    END CATCH
END
GO

PRINT 'Running PurchaseOrder/spPurchaseOrders_UpdateStatus.sql'
GO

CREATE OR ALTER PROCEDURE spPurchaseOrders_UpdateStatus
    @POId INT,
    @Status VARCHAR(20)
AS
BEGIN
    SET NOCOUNT ON
    
    UPDATE PurchaseOrders 
    SET Status = @Status
    WHERE POID = @POId
    
    EXEC spPurchaseOrders_GetById @POId
END
GO


PRINT 'Running Password/spPasswordReset_Reset.sql'
GO

CREATE OR ALTER PROCEDURE spPasswordReset_Reset
    @Token NVARCHAR(500),
    @NewPasswordHash NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @UserId INT;

    SELECT @UserId = UserId
    FROM PasswordResetTokens
    WHERE Token = @Token
      AND Expiry > GETUTCDATE();

    IF @UserId IS NOT NULL
    BEGIN
        UPDATE Users
        SET PasswordHash = @NewPasswordHash,
            UpdatedAt = GETUTCDATE()
        WHERE UserId = @UserId;

        DELETE FROM PasswordResetTokens WHERE Token = @Token;
    END
END

GO

PRINT 'Running Password/spPasswordReset_Save.sql'
Go


CREATE OR ALTER PROCEDURE spPasswordReset_Save
    @UserId INT,
    @Token NVARCHAR(500),
    @Expiry DATETIME
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM PasswordResetTokens WHERE UserId = @UserId;

    INSERT INTO PasswordResetTokens (UserId, Token, Expiry)
    VALUES (@UserId, @Token, @Expiry);
END

GO

PRINT 'Running Auth/spUser_DeleteUser.sql'
GO
CREATE OR ALTER PROCEDURE spUser_DeleteUser
    @UserId INT
AS
BEGIN
    UPDATE Users
    SET 
        DeletedAt = GETUTCDATE(),
        IsActive = 0
    WHERE UserId = @UserId;
END

GO


PRINT 'Running Auth/spUser_GetAllUsers.sql'
GO
CREATE OR ALTER PROCEDURE [dbo].[spUser_GetAllUsers]
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        UserId, Email, FullName, Status, 
        ProfileImageUrl, Phone, Address, City, Role, 
        IsActive, CreatedAt, UpdatedAt
    FROM Users 
    WHERE DeletedAt IS NULL
    ORDER BY CreatedAt DESC;
END

GO

    PRINT 'Running Auth/spUser_GetAllUsersPaged.sql'
        GO
CREATE OR ALTER PROCEDURE spUser_GetAllUsersPaged
    @PageNumber INT,
    @PageSize INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM Users
    WHERE IsActive = 1 
    ORDER BY UserId
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;

    
    SELECT COUNT(*) AS TotalCount FROM Users WHERE IsActive = 1;
END

    GO
    PRINT 'Running Auth/spUser_GetByRefreshToken.sql'
    GO

    CREATE OR ALTER PROC [dbo].[spUser_GetByRefreshToken] 
(
	@refreshToken varchar(max)
)
AS 
BEGIN 
	IF NOT EXISTS(
		SELECT 1 FROM
		Users
		WHERE 
		refreshToken = @refreshToken
	)
	RETURN;

	SELECT 
	*
	FROM
	Users
	WHERE refreshToken = @refreshToken
END


GO


PRINT 'Running Auth/spUser_GetUserByEmail.sql'
Go
CREATE OR ALTER PROCEDURE [dbo].[spUser_GetUserByEmail]
    @Email NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        UserId, Email, PasswordHash, FullName, Status, 
        ProfileImageUrl, Phone, Address, City, Role, 
        IsActive, CreatedAt, UpdatedAt, DeletedAt
    FROM Users 
    WHERE Email = @Email AND DeletedAt IS NULL;
END

GO

PRINT 'Running Auth/spUser_GetUserById.sql'
GO
CREATE OR ALTER PROCEDURE [dbo].[spUser_GetUserById]
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;
    
    SELECT 
        UserId, Email, PasswordHash, FullName, Status, 
        ProfileImageUrl, Phone, Address, City, Role, 
        IsActive, CreatedAt, UpdatedAt, DeletedAt
    FROM Users 
    WHERE UserId = @UserId AND DeletedAt IS NULL;
END

GO

PRINT 'Running Auth/spUser_Logout.sql'
GO


CREATE OR ALTER PROCEDURE [dbo].[spUser_Logout]
    @UserId INT
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE UserRefreshTokens
    SET IsRevoked = 1
    WHERE UserId = @UserId;

END;

GO

    PRINT 'Running Auth/spUser_RegisterUser.sql'
    GO


CREATE OR ALTER PROCEDURE [dbo].[spUser_RegisterUser]

    @Email NVARCHAR(255),
    @PasswordHash NVARCHAR(MAX),
    @FullName NVARCHAR(255),
    @Phone NVARCHAR(20) = NULL,
    @Address NVARCHAR(500) = NULL,
    @City NVARCHAR(100) = NULL,
    @Role BIT = 0,
    @UserId INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    
    IF EXISTS (SELECT 1 FROM Users WHERE Email = @Email AND DeletedAt IS NULL)
    BEGIN
        THROW 50001, 'Email already exists', 1;
        RETURN;
    END
    
    INSERT INTO Users (Email, PasswordHash, FullName, Phone, Address, City, Role, IsActive, CreatedAt)
    VALUES (@Email, @PasswordHash, @FullName, @Phone, @Address, @City, @Role, 1, GETDATE());
    
    SET @UserId = SCOPE_IDENTITY();
END

GO

PRINT 'Running Auth/spUser_RevokeRefreshToken.sql'
Go

CREATE OR ALTER PROCEDURE [dbo].[spUser_RevokeRefreshToken]
    @UserId INT
AS
BEGIN
    UPDATE Users
    SET 
        RefreshToken = NULL,
        UpdatedAt = SYSUTCDATETIME()
    WHERE UserId = @UserId;
END

Go
PRINT 'Running Auth/spUser_RotateRefreshToken.sql'
GO


CREATE OR ALTER PROCEDURE spUser_RotateRefreshToken
    @OldRefreshToken VARCHAR(500),
    @NewRefreshToken VARCHAR(500)
AS
BEGIN
    UPDATE Users
    SET 
        RefreshToken = @NewRefreshToken,
        UpdatedAt = SYSUTCDATETIME()
    WHERE RefreshToken = @OldRefreshToken;
END
GO

PRINT 'Running Auth/spUser_SaveRefreshToken.sql'
Go

CREATE OR ALTER PROCEDURE spUser_SaveRefreshToken


    @UserId INT,
    @RefreshToken VARCHAR(500)
AS
BEGIN
    UPDATE Users
    SET 
        RefreshToken = @RefreshToken,
        UpdatedAt = SYSUTCDATETIME()
    WHERE UserId = @UserId AND IsActive = 1;
END
GO


PRINT 'Running Auth/spUser_ValidateRefreshToken.sql'
GO

CREATE OR ALTER PROCEDURE spUser_ValidateRefreshToken
    @RefreshToken VARCHAR(500)
AS
BEGIN
    SELECT 
        UserId,
        Email,
        FullName,
        Role
    FROM Users
    WHERE 
        RefreshToken = @RefreshToken
        AND IsActive = 1;
END

GO

PRINT 'Running Auth/spUser_UpdateUserStatus.sql'
GO

CREATE OR ALTER PROCEDURE [dbo].[UpdateUserStatus]
    @UserId INT,
    @IsActive BIT
AS
BEGIN
    SET NOCOUNT ON;
    
    UPDATE Users 
    SET 
        IsActive = @IsActive,
        UpdatedAt = GETDATE()
    WHERE UserId = @UserId AND DeletedAt IS NULL;
END

GO

PRINT 'Running Wishlist/whislistAdd.sql'
GO

CREATE OR ALTER PROCEDURE spWishlist_Add
    @UserId INT,
    @ProductId INT
AS
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM Wishlists 
        WHERE UserId = @UserId AND ProductId = @ProductId
    )
    BEGIN
        INSERT INTO Wishlists (UserId, ProductId)
        VALUES (@UserId, @ProductId)
    END
END
GO

PRINT 'Running wishlist/whislistdetele'
GO

CREATE OR ALTER PROCEDURE spWishlist_Delete
    @WishlistId INT
AS
BEGIN
    DELETE FROM Wishlists WHERE WishlistId = @WishlistId
END
GO


PRINT 'Running wishlist/getbyuser'
Go

CREATE OR ALTER PROCEDURE [dbo].[spWishlist_GetByUser]
    @UserId INT
AS
BEGIN
    SELECT 
        w.WishlistId,
        w.UserId,
        w.ProductId,
        p.Name,
        w.AddedDate,
        p.Name,
        p.Price As ProductPrice
    FROM Wishlists w
    INNER JOIN Products p ON w.ProductId = p.ProductId
    WHERE w.UserId = @UserId
END




