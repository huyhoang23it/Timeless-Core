using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Data.Entities
{
    public class Requests
    {
        [Key]
        public Guid RequestId { get; set; } 

        [Required]
        public Guid GroupId { get; set; }

        [Required]
        public Guid SenderId { get; set; }

        [Required]
        public Guid ReceiverId { get; set; }

        [Required]
        public DateTime SentAt { get; set; } = DateTime.UtcNow;

        [Required]
        public int RequestType { get; set; }

        [Required]
        public int Status { get; set; }
    }
}
