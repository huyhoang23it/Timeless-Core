using EventMate_Common.Status;
using EventMate_Common.Type;

namespace EventMate_WebAPI.ModelsMapping.Event
{
    public class EventCreateModel
    {
        public string? Name { get; set; }
        public string? Place { get; set; }
        public DateTime TimeStart { get; set; }
        public DateTime TimeEnd { get; set; }
        public string? Img { get; set; }
        public string? Description { get; set; }
        public Guid UserId { get; set; }
        public EventType Type { get; set; }
        public EventStatus Status { get; set; }
    }
}
