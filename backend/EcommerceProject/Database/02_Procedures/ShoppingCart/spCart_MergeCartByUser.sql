USE EcommerceDB;
Go

CREATE OR ALTER PROCEDURE spCart_MergeCartByUser
(
    @GuestCartId INT,
    @UserId INT
)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @GuestCart TABLE
    (
        VariantId INT,
        Quantity INT
    );

    INSERT INTO @GuestCart (VariantId, Quantity)
    SELECT VariantId, Quantity
    FROM ShoppingCarts
    WHERE CartId = @GuestCartId;

 
    MERGE INTO ShoppingCarts AS Target
    USING @GuestCart AS Source
    ON Target.UserId = @UserId
       AND Target.VariantId = Source.VariantId
    WHEN MATCHED THEN
        UPDATE SET Target.Quantity = Target.Quantity + Source.Quantity
    WHEN NOT MATCHED BY TARGET THEN
        INSERT (UserId, VariantId, Quantity, AddedDate)
        VALUES (@UserId, Source.VariantId, Source.Quantity, GETDATE());

   
    DELETE FROM ShoppingCarts
    WHERE CartId = @GuestCartId;
END
