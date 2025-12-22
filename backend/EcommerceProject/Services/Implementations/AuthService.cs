using Dapper;
using EcommerceProject.Database;
using EcommerceProject.Models.DTOs.User;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Interfaces;
using EcommerceProject.utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace EcommerceProject.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IConfiguration _configuration;
        private readonly ISqlConnectionFactory _connectionFactory;
        private readonly IUserService _userService;
        private readonly IJwtTokenService _jwtService;
        private readonly IAuthRepository _auth;
        private readonly IHttpContextAccessor _httpContext;
        public AuthService(IConfiguration configuration, ISqlConnectionFactory connectionFactory, IUserService userService, IJwtTokenService jwtService, IAuthRepository auth, IHttpContextAccessor httpcontext)
        {
            _configuration = configuration;
            _connectionFactory = connectionFactory;
            _userService = userService;
            _jwtService = jwtService;
            _auth = auth ?? throw new ArgumentNullException(nameof(auth));
            _httpContext = httpcontext ?? throw new ArgumentNullException(nameof(httpcontext));
        }

        public async Task<AuthResponseDto> RegisterAsync(RegisterDto registerDto)
        {
            var existingUser = await _userService.GetUserByEmailAsync(registerDto.Email);
            if (existingUser != null)
            {
                throw new Exception("User with this email already exists.");
            }

            var passwordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

            using var connection = _connectionFactory.CreateConnection();
            using var command = new SqlCommand("spUser_RegisterUser", (SqlConnection)connection)
            {
                CommandType = CommandType.StoredProcedure
            };

            var parameters = new DynamicParameters();
            parameters.Add("@FullName", registerDto.FullName);
            parameters.Add("@Email", registerDto.Email);
            parameters.Add("@PasswordHash", passwordHash);
            parameters.Add("@Phone", registerDto.Phone);
            parameters.Add("@Address", registerDto.Address);
            parameters.Add("@City", registerDto.City);
            parameters.Add("@Role", false);
            parameters.Add("@UserId", dbType: DbType.Int32, direction: ParameterDirection.Output);

            await connection.ExecuteAsync(
                "spUser_RegisterUser",
                parameters,
                commandType: CommandType.StoredProcedure
                );

            var userId = parameters.Get<int>("@UserId");



            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null)
            {
                throw new Exception("User registration failed.");
            }


            var token = _jwtService.GenerateJwtToken(user);


            return new AuthResponseDto
            {
                Token = token,
                Expiration = DateTime.UtcNow.AddHours(Convert.ToDouble(_configuration["Jwt:AccessTokenExpiryInMinutes"])),

                user = new UserDto
                {
                    UserId = user.UserId,
                    Email = user.Email!,
                    FullName = user.FullName!,
                    Phone = user.Phone,
                    Address = user.Address,
                    City = user.City,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt
                }
            };


        }


        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var user = await _userService.GetUserByEmailAsync(loginDto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash!))
            {
                throw new Exception("Invalid email or password.");
            }
            if (!user.IsActive)
            {
                throw new Exception("User account is inactive.");
            }

            var accesstoken = _jwtService.GenerateJwtToken(user);
            var refreshToken = TokenGenerator.GenerateRefreshToken();


            var refreshTokenHash = TokenHasher.Hash(refreshToken);

            var refreshExpiry = DateTime.UtcNow.AddDays(
                Convert.ToInt32(_configuration["Jwt:RefreshToken"]));

            await _auth.SaveRefreshTokenAsync(
                user.UserId,
                refreshTokenHash,
                refreshExpiry);


            _httpContext.HttpContext!.Response.Cookies.Append(
                "refreshToken",
                refreshToken,
                new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,

                    SameSite = SameSiteMode.Strict,
                    Expires = refreshExpiry
                }
    );


            return new AuthResponseDto
            {
                Token = accesstoken,
                RefreshToken = refreshToken,
                Expiration = DateTime.UtcNow.AddHours(Convert.ToDouble(_configuration["Jwt:ExpireHours"])),
                user = new UserDto
                {
                    UserId = user.UserId,
                    Email = user.Email!,
                    FullName = user.FullName!,
                    Phone = user.Phone,
                    Address = user.Address,
                    City = user.City,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt,


                }
            };
        }

        public async Task<AuthResponseDto> RefreshTokenAsync(string refreshToken)

        {
            var hashedRefreshToken = TokenHasher.Hash(refreshToken);
            var user = await _auth.GetUserByRefreshTokenAsync(hashedRefreshToken);
            if (user == null)
            {
                throw new UnauthorizedAccessException("Invalid refresh token");
            }
            var newAccessToken = _jwtService.GenerateJwtToken(user);
            var newRefreshToken = TokenGenerator.GenerateRefreshToken();

            await _auth.RotateRefreshTokenAsync(refreshToken, newRefreshToken);

            return new AuthResponseDto
            {
                Token = newAccessToken,
                RefreshToken = newRefreshToken,
                Expiration = DateTime.UtcNow.AddHours(Convert.ToDouble(_configuration["Jwt:ExpireHours"])),
                user = new UserDto
                {
                    UserId = user.UserId,
                    Email = user.Email!,
                    FullName = user.FullName!,
                    Phone = user.Phone,
                    Address = user.Address,
                    City = user.City,
                    Role = user.Role,
                    CreatedAt = user.CreatedAt
                }
            };
        }

        public async Task<bool> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto)
        {
            var user = await _userService.GetUserByIdAsync(userId);
            if (user == null)
            {
                throw new KeyNotFoundException("User not found");
            }
            if (!BCrypt.Net.BCrypt.Verify(changePasswordDto.CurrentPassword, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Current password is  incorrect");
            }

            var newPasswordHash = BCrypt.Net.BCrypt.HashPassword(changePasswordDto.NewPassword);
            using var connection = _connectionFactory.CreateConnection();

            await connection.ExecuteAsync(
                "spUSer_UpdateUser",
                new
                {
                    userId = userId,
                    PasswordHash = newPasswordHash
                },
                commandType: CommandType.StoredProcedure);

            return true;

        }


        public async Task LogoutAsync(int userId)
        {
            using var connection = _connectionFactory.CreateConnection();

            await connection.ExecuteAsync(
                "spUser_Logout",
                new { UserId = userId },
                commandType: CommandType.StoredProcedure
            );
        }
    }
}
