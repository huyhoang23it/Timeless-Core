using EventMate.Data;
using EventMate_Common.Status;
using Eventmate_Data.IEventRepository;
using EventMate_Data.Entities;
using EventMate_Data.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Data.Repositories
{
    public class EventRepository : IEventRepository
    {

        private readonly DataContext _context;
        public EventRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Events>> GetAllEventsAsync()
        {
            var events = await _context.Events!.ToListAsync();
            return events;
        }

        public async Task<IEnumerable<Events>> GetEventsByStatusAsync(EventStatus status)
        {
            var events = await _context.Events!
                .Where(e => e.Status == status)
                .ToListAsync();
            return events;
        }

        public async Task<IEnumerable<Events>> GetEventsByUserAsync(Guid userId)
        {
            var events = await _context.Events!
                .Where(e => e.UserId == userId)
                .ToListAsync();
            return events;
        }

        public async Task<Events?> GetEventByIdAsync(Guid eventId)
        {
            var eventEntity = await _context.Events!.FindAsync(eventId);
            return eventEntity;
        }

        public async Task<Events?> AddEventAsync(Events eventEntity)
        {
            try
            {
                if (!string.IsNullOrEmpty(eventEntity.Img))
                {
                    eventEntity.Img = $"https://amzn-eventmate-event.s3.ap-southeast-2.amazonaws.com/{eventEntity.Img}";
                }

                _context.Events.Add(eventEntity);
                await _context.SaveChangesAsync();
                return eventEntity;
            }
            catch (Exception)
            {
                return null;
            }
        }


        public async Task DeleteEventAsync(Guid eventId)
        {
            var eventEntity = await _context.Events!.FindAsync(eventId);
            if (eventEntity != null)
            {
                _context.Events.Remove(eventEntity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<bool> ChangeEventStatusAsync(Guid eventId, EventStatus newStatus)
        {
            var eventEntity = await _context.Events!.FindAsync(eventId);
            if (eventEntity == null)
            {
                return false;
            }

            eventEntity.Status = newStatus;
            _context.Events.Update(eventEntity);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Events?> GetEventByNameAsync(string eventName)
        {
            var eventEntity = await _context.Events
                .FirstOrDefaultAsync(e => e.Name == eventName);

            if (eventEntity != null && !string.IsNullOrEmpty(eventEntity.Img))
            {
                eventEntity.Img = $"https://amzn-eventmate-event.s3.ap-southeast-2.amazonaws.com/{eventEntity.Img}";
            }

            return eventEntity;
        }

    }
}
