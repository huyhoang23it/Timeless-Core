using AutoMapper;
using EventMate_Common.Status;
using EventMate_Data.Entities;
using EventMate_Service.Services;
using EventMate_WebAPI.ModelsMapping;
using EventMate_WebAPI.ModelsMapping.Event;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventMate_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly EventService _eventService;
        private readonly IMapper _mapper;
        public EventController(EventService eventService, IMapper mapper)
        {
            _eventService = eventService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEvents()
        {
            var events = await _eventService.GetAllEventsAsync();
            return Ok(events);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(Guid id)
        {
            var eventEntity = await _eventService.GetEventByIdAsync(id);
            if (eventEntity == null)
                return NotFound();
            return Ok(eventEntity);
        }

        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] EventCreateModel model)
        {
            var eventEntity = _mapper.Map<Events>(model);
            await _eventService.AddEventAsync(eventEntity);
            return CreatedAtAction(nameof(GetEventById), new { id = eventEntity.EventId }, eventEntity);
        }

        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetEventsByStatus(EventStatus status)
        {
            var events = await _eventService.GetEventsByStatusAsync(status);

            if (!events.Any())
            {
                return NotFound(new { message = "No events found with the specified status" });
            }

            return Ok(events);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetEventsByUser(Guid userId)
        {
            var events = await _eventService.GetEventsByUserAsync(userId);

            if (!events.Any())
            {
                return NotFound(new { message = "No events found for this user" });
            }

            return Ok(events);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            await _eventService.DeleteEventAsync(id);
            return NoContent();
        }

        [HttpPut("change-status/{eventId}")]
        public async Task<IActionResult> ChangeEventStatus(Guid eventId, [FromBody] EventStatus newStatus)
        {
            var success = await _eventService.ChangeEventStatusAsync(eventId, newStatus);
            if (!success)
            {
                return NotFound(new { message = "Event not found" });
            }

            return Ok(new { message = "Event status updated successfully" });
        }

    }
}
