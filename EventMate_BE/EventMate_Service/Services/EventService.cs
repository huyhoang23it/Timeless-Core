using EventMate_Common.Status;
using Eventmate_Data.IEventRepository;
using Eventmate_Data.IRepositories;
using EventMate_Data.Entities;
using EventMate_Data.IRepositories;
using EventMate_Data.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Service.Services
{
    public class EventService
    {
        private readonly IEventRepository _eventRepository;

        public EventService(IEventRepository eventRepository)
        {
            _eventRepository = eventRepository;

        }
        public async Task<IEnumerable<Events>> GetAllEventsAsync()
        {
            return await _eventRepository.GetAllEventsAsync();
        }

        public async Task<IEnumerable<Events>> GetEventsByStatusAsync(EventStatus status)
        {
            return await _eventRepository.GetEventsByStatusAsync(status);
        }

        public async Task<IEnumerable<Events>> GetEventsByUserAsync(Guid userId)
        {
            return await _eventRepository.GetEventsByUserAsync(userId);
        }

        public async Task<Events?> GetEventByIdAsync(Guid eventId)
        {
            return await _eventRepository.GetEventByIdAsync(eventId);
        }

        public async Task<Events> AddEventAsync(Events eventEntity)
        {
            var createdEvent = await _eventRepository.AddEventAsync(eventEntity);
            return createdEvent ?? null;
        }


        public async Task DeleteEventAsync(Guid eventId)
        {
            await _eventRepository.DeleteEventAsync(eventId);
        }

        public async Task<bool> ChangeEventStatusAsync(Guid eventId, EventStatus newStatus)
        {
            return await _eventRepository.ChangeEventStatusAsync(eventId, newStatus);
        }

        public async Task<Events?> GetEventByNameAsync(string eventName)
        {
            return await _eventRepository.GetEventByNameAsync(eventName);
        }


    }


}

