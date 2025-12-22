
using System.Net;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace EcommerceProject.Filters
{
    public sealed class GlobalExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            if (context.Exception is ValidationException ve)
            {
                context.Result = new BadRequestObjectResult(
                    ve.Errors.Select(e => new
                    {
                        Field = e.PropertyName,
                        Error = e.ErrorMessage
                    })
                );

                context.ExceptionHandled = true;
                return;
            }
            context.Result = new ObjectResult(new
            {
                message = "An unexpected error occurred."
            })
            {
                StatusCode = (int)HttpStatusCode.InternalServerError
            };

            context.ExceptionHandled = true;
        }
    }
}
