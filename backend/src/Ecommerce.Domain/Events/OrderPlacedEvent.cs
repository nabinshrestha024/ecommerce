using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ecommerce.Domain.Interfaces;

namespace Ecommerce.Domain.Events
{
    public sealed record OrderPlacedEvent(int OrderId, int CustomerId, DateTime PlacedAt) : IDomainEvent
    {
        public DateTime OccurredOn {  get; } = DateTime.UtcNow;
    }
}
