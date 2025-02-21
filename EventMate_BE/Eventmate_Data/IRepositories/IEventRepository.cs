﻿using EventMate_Common.Status;
using EventMate_Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eventmate_Data.IEventRepository
{
    public interface IEventRepository
    {
        Task<IEnumerable<Events>> GetAllEventsAsync();
        Task<IEnumerable<Events>> GetEventsByStatusAsync(EventStatus status);
        Task<IEnumerable<Events>> GetEventsByUserAsync(Guid userId);

        Task<Events?> GetEventByIdAsync(Guid eventId);
        Task<Events> AddEventAsync(Events eventEntity);
        Task DeleteEventAsync(Guid eventId);
        Task<bool> ChangeEventStatusAsync(Guid eventId, EventStatus newStatus);
        Task<Events?> GetEventByNameAsync(string eventName);



    }
}
