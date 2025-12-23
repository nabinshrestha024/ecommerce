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
