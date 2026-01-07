USE EcommerceDb;
GO

CREATE OR ALTER PROCEDURE spProductAttributeValue_Update
(
    @AttributeValueId INT,
    @Value VARCHAR(100)
)
AS
BEGIN
    SET NOCOUNT ON;

    UPDATE ProductAttributeValues
    SET
        Value = @Value
    WHERE AttributeValueId = @AttributeValueId;

    SELECT @@ROWCOUNT AS Affected;
END
GO
