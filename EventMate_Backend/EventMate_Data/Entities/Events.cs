using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Data.Entities
{
    public class Events
    {
        [Key]
        public Guid EventId { get; set; } 

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Place { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public Guid CreatedBy { get; set; }

        [Required]
        public DateTime TimeStart { get; set; }

        [Required]
        public DateTime TimeEnd { get; set; }

        public string? Img { get; set; }

        public string? Description { get; set; }

        [Required]
        public int Type { get; set; }

        [Required]
        public int Status { get; set; }
    }
}
