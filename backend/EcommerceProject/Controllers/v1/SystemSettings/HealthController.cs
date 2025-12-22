using Dapper;
using EcommerceProject.Database;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EcommerceProject.Controllers.v1.SystemSettings
{
    [Route("health")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        private readonly ISqlConnectionFactory _factory;

        public HealthController(ISqlConnectionFactory factory)
        {
            _factory = factory;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                using var conn = _factory.CreateConnection();
                await conn.ExecuteAsync("SELECT 1");

                return Ok(new
                {
                    status = "Healthy",
                    database = "Connected",
                    timestamp = DateTime.UtcNow
                });
            }
            catch
            {
                return StatusCode(503, new
                {
                    status = "Unhealthy",
                    database = "Unavailable",
                    timestamp = DateTime.UtcNow
                });
            }
        }
    }
}
