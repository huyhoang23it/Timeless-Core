using EventMate_Common.Enum;
using EventMate_Common.Status;
using EventMate_Common.Type;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace EventMate_Data.Entities
{
    public class Multimedia
    {
        [Key]
        public Guid ImageId { get; set; } 

        [Required]
        public string Url { get; set; } = string.Empty; 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public Guid CreatedBy { get; set; }

        [Required]
        public MultimediaType Type { get; set; }

        public Guid? GroupId { get; set; }

        [Required]
        public MultimediaStatus Status { get; set; }

        // Khóa ngoại
        [ForeignKey("CreatedBy")]
        public virtual User Creator { get; set; }

        [ForeignKey("GroupId")]
        public virtual Group? Group { get; set; }
    }
}
