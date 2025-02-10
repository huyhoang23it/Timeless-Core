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
        public Guid Id { get; set; }
        public string? Img { get; set; } = string.Empty;

        public string? Name { get; set; } = string.Empty;
        public Guid? GroupId { get; set; }

        [Required]
        public string Type { get; set; } = string.Empty;

        public Guid? CreatedBy { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public int Status { get; set; }
        [ForeignKey("GroupId")] public virtual Groups? Group { get; set; }
        public virtual ICollection<User_Conversation>? User_Conversations { get; set; }
        public virtual ICollection<Messages>? Messages { get; set; }

    }
}
