using System.Text;
using EcommerceProject.Database;
using EcommerceProject.Filters;
using EcommerceProject.Repositories.Implementations;
using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Services.Implementations;
using EcommerceProject.Services.Interfaces;
using System.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<ISqlConnectionFactory, SqlConnectionFactory>();
builder.Services.AddScoped<IDbConnection>(sp => 
    sp.GetRequiredService<ISqlConnectionFactory>().CreateConnection());

builder.Services.AddControllers(options =>
{
    options.Filters.Add<GlobalExceptionFilter>();
});
builder.Services.AddEndpointsApiExplorer();


builder.Services.AddSwaggerGen(x =>
{
    x.SwaggerDoc("v1", new OpenApiInfo { Title = "ECommerce", Version = "v1" });
    var securityScheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Description = "JWT Authorization header using the Bearer scheme.",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = "Bearer"
        }
    };

    x.AddSecurityDefinition("Bearer", securityScheme);



    x.AddSecurityRequirement(new OpenApiSecurityRequirement
     {
         {
             securityScheme,
             new string[] {}
         }
     });
    x.CustomSchemaIds(type => type.FullName);
});

builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ISqlConnectionFactory, SqlConnectionFactory>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IFileStorageService, FileStorageService>();

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IPurchaseOrderRepository, PurchaseOrderRepository>();
builder.Services.AddScoped<IUserProfileRepository, UserProfileRepository>();
builder.Services.AddScoped<IStockRepository, StockRepository>();
builder.Services.AddScoped<IVendorRepository, VendorRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<ISettingsRepository, SettingsRepository>();
builder.Services.AddScoped<ICheckoutRepository, CheckoutRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IShipmentRepository, ShipmentRepository>();
builder.Services.AddScoped<ICartRepository, CartRepository>();



builder.Services.AddScoped<ICartService, CartService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IPurchaseOrderService, PurchaseOrderService>();
builder.Services.AddScoped<IUserProfileService, UserProfileService>();
builder.Services.AddScoped<IStockService, StockService>();
builder.Services.AddScoped<IVendorService, VendorService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ISettingsService, SettingsService>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<ICheckoutService, CheckoutService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IShipmentService, ShipmentService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddHttpContextAccessor(); 

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IPasswordRepository, PasswordResetRepository>();
builder.Services.AddScoped<IWishlistRepository, WishlistRepository>();
builder.Services.AddScoped<IWishlistService, WishlistService>();



var jwtSettings = builder.Configuration.GetSection("Jwt");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtSettings["Secret"] ?? throw new InvalidOperationException("JWT Secret is not configured")))
        };
    });





var allowedOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(allowedOrigins!)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});





var app = builder.Build();

app.UseStaticFiles();
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "ECommerce v1");
    c.RoutePrefix = "swagger"; 
});


app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
