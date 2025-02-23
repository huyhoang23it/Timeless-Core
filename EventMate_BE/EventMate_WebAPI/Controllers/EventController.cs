using AutoMapper;
using EventMate_Common.Common;
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
            try
            {
                var events = await _eventService.GetAllEventsAsync();
                return Ok(new ApiResponse<IEnumerable<Events>>(200, ResponseKeys.FetchEventSuccess, events));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(Guid id)
        {
            try
            {
                var eventEntity = await _eventService.GetEventByIdAsync(id);

                if (eventEntity == null)
                {
                    return NotFound(new ApiResponse<string>(404, ResponseKeys.NotFound, "Không tìm thấy sự kiện."));
                }

                return Ok(new ApiResponse<Events>(200, ResponseKeys.LoginSuccess, eventEntity));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }


        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] EventCreateModel model)
        {
            try
            {
                // Kiểm tra dữ liệu đầu vào không hợp lệ
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse<string>(400, ResponseKeys.InvalidRequest, "Dữ liệu không hợp lệ."));
                }

                // Kiểm tra xem thời gian bắt đầu có hợp lệ không
                if (model.TimeStart >= model.TimeEnd)
                {
                    return BadRequest(new ApiResponse<string>(400, ResponseKeys.InvalidEventTime, "Thời gian bắt đầu phải trước thời gian kết thúc."));
                }

                // Kiểm tra trùng tên sự kiện
                var existingEvent = await _eventService.GetEventByNameAsync(model.Name);
                if (existingEvent != null)
                {
                    return Conflict(new ApiResponse<string>(409, ResponseKeys.DuplicateEventName, "Tên sự kiện đã tồn tại."));
                }

                // Ánh xạ dữ liệu từ model sang entity
                var eventEntity = _mapper.Map<Events>(model);

                // Thêm sự kiện vào DB
                var createdEvent = await _eventService.AddEventAsync(eventEntity);

                if (createdEvent == null)
                {
                    return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.EventCreationFailed, "Không thể tạo sự kiện."));
                }

                return CreatedAtAction(nameof(GetEventById), new { id = createdEvent.EventId },
                    new ApiResponse<Events>(201, ResponseKeys.AccountCreated, createdEvent));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }


        [HttpGet("status/{status}")]
        public async Task<IActionResult> GetEventsByStatus(EventStatus status)
        {
            try
            {
                var events = await _eventService.GetEventsByStatusAsync(status);

                if (events == null || !events.Any())
                {
                    return NotFound(new ApiResponse<string>(404, ResponseKeys.NotFound, "Không tìm thấy sự kiện với trạng thái được chỉ định."));
                }

                return Ok(new ApiResponse<IEnumerable<Events>>(200, ResponseKeys.FetchEventSuccess, events));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }


        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetEventsByUser(Guid userId)
        {
            try
            {
                var events = await _eventService.GetEventsByUserAsync(userId);
                return Ok(new ApiResponse<IEnumerable<Events>>(200, ResponseKeys.LoginSuccess, events));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(Guid id)
        {
            try
            {
                var eventEntity = await _eventService.GetEventByIdAsync(id);
                if (eventEntity == null)
                {
                    return NotFound(new ApiResponse<string>(404, ResponseKeys.NotFound, "Không tìm thấy sự kiện cần xóa."));
                }

                await _eventService.DeleteEventAsync(id);
                return Ok(new ApiResponse<string>(200, ResponseKeys.EventDeleted, "Sự kiện đã được xóa thành công."));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }


        [HttpPut("change-status/{eventId}")]
        public async Task<IActionResult> ChangeEventStatus(Guid eventId, [FromBody] EventStatus newStatus)
        {
            try
            {
                var eventEntity = await _eventService.GetEventByIdAsync(eventId);
                if (eventEntity == null)
                {
                    return NotFound(new ApiResponse<string>(404, ResponseKeys.NotFound, "Không tìm thấy sự kiện cần cập nhật."));
                }

                var success = await _eventService.ChangeEventStatusAsync(eventId, newStatus);
                if (!success)
                {
                    return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, "Không thể cập nhật trạng thái sự kiện."));
                }

                return Ok(new ApiResponse<string>(200, ResponseKeys.EventUpadated, "Trạng thái sự kiện đã được cập nhật thành công."));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }


    }
}
