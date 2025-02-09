using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Data.Entities
{
    public class Conversations
    {
        [Key]
        public int Id { get; set; }
        public string Img { get; set; } = string.Empty;

        public string Name { get; set; } = string.Empty;
        [Required]
        public int GroupId { get; set; }

        [Required]
        public string Type { get; set; } = string.Empty;

        [Required]
        public int CreatedBy { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public int Status { get; set; }
    }
}
