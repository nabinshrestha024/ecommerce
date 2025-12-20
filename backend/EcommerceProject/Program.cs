using EcommerceProject.Database;
using EcommerceProject.Services.Implementations;
using EcommerceProject.Services.Interfaces;
using System.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

using System.Text;

using EcommerceProject.Repositories.Interfaces;
using EcommerceProject.Repositories.Implementations;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<ISqlConnectionFactory, SqlConnectionFactory>();
builder.Services.AddScoped<IDbConnection>(sp => 
    sp.GetRequiredService<ISqlConnectionFactory>().CreateConnection());

builder.Services.AddControllers();

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
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ISqlConnectionFactory, SqlConnectionFactory>();
builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IPurchaseOrderRepository, PurchaseOrderRepository>();
builder.Services.AddScoped<IStockRepository, StockRepository>();
builder.Services.AddScoped<IVendorRepository, VendorRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IUserProfileRepository, UserProfileRepository>();

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IPurchaseOrderService, PurchaseOrderService>();
builder.Services.AddScoped<IStockService, StockService>();
builder.Services.AddScoped<IVendorService, VendorService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IUserProfileService, UserProfileService>();


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

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();


app.MapControllers();

app.Run();
