USE [EcommerceDB]

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


