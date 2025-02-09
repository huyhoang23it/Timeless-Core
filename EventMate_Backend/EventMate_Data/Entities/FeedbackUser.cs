using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Data.Entities
{
    public class FeedbackUser
    {
        [Key]
        public Guid FeedbackId { get; set; } 
        [Required]
        public int Rate { get; set; }

        [Required]
        public Guid GroupId { get; set; }

        [Required]
        public Guid ReviewerId { get; set; }

        [Required]
        public Guid ReviewedUserId { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public int FeedbackType { get; set; }

        [Required]
        public int Status { get; set; }
    }
}
