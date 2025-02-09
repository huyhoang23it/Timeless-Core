using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Data.Entities
{
    public class Comments
    {
        [Key]
        public int CommentId { get; set; }

        [Required]
        public string Content { get; set; } = string.Empty;

        [Required]
        public int PostId { get; set; }

        [Required]
        public int CommentBy { get; set; }

        [Required]
        public DateTime CommentAt { get; set; } = DateTime.UtcNow;
    }
}
