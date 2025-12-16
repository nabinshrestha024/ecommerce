using System.Reflection;
using Ecommerce.Application.Common.Behaviors;
using Ecommerce.Application.Features.Categories.Queries;
using Ecommerce.Application.Features.Categories.Validator;
using Ecommerce.Application.Features.Orders.Queries;
using Ecommerce.Persistence.Extensions;
using MediatR;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddPersistenceServices(builder.Configuration);
// MediatR registration
builder.Services.AddMediatR(
    typeof(GetAllCategoriesQuery).Assembly,
    typeof(GetOrderByIdQuery).Assembly
    );


builder.Services.AddAutoMapper(typeof(Ecommerce.Application.Mapping.AutoMapperProfile).Assembly);

// Add services to the container.
// In Program.cs


builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
