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
            return await _context.Events!.ToListAsync();
        }
        public async Task<IEnumerable<Events>> GetEventsByStatusAsync(EventStatus status)
        {
         return await _context.Events!
        .Where(e => e.Status == status)
        .ToListAsync();
        }

        public async Task<IEnumerable<Events>> GetEventsByUserAsync(Guid userId)
        {
            return await _context.Events!
                .Where(e => e.UserId == userId)
                .ToListAsync();
        }


        public async Task<Events?> GetEventByIdAsync(Guid eventId)
        {
            return await _context.Events!.FindAsync(eventId);
        }

        public async Task AddEventAsync(Events eventEntity)
        {
            await _context.Events!.AddAsync(eventEntity);
            await _context.SaveChangesAsync();
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

    }
}
