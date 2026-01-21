namespace EcommerceProject.Middlewares.Interface;
public interface IExceptionMiddleware
{
    Task InvokeAsync(HttpContext context);
}

