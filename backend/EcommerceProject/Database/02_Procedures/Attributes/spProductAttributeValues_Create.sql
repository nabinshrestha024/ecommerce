USE EcommerceDB;
GO

CREATE OR ALTER PROCEDURE spProductAttributeValues_Create
(
    @AttributeId INT,
    @Value VARCHAR(100)
)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO ProductAttributeValues (AttributeId, Value)
    VALUES (@AttributeId, @Value);

    SELECT SCOPE_IDENTITY() AS AttributeValueId;
END
GO
