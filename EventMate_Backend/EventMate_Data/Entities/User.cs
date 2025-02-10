using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Data.Entities
{
    public class User
    {
        [Key]
        public Guid UserId { get; set; }

        [Required]
        public string FullName { get; set; } = string.Empty;

        public string? GoogleId { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string? Avatar { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public Guid RoleId { get; set; } 

        public string? FacebookId { get; set; }

        [Required]
        public int Status { get; set; }
        
        public virtual ICollection<Requests>? Requests { get; set; }
        public virtual ICollection<FeedbackUser>? FeedbackUsers { get; set; }
        public virtual ICollection<Posts>? Posts { get; set; }
        public virtual ICollection<Comments>? Comments { get; set; }
        public virtual ICollection<ReplyComments>? ReplyComments { get; set; }
        public virtual ICollection<Reactions>? Reactions { get; set; }
        public virtual ICollection<User_Group>? User_Group { get; set; }
        public virtual ICollection<Events>? Events { get; set; }
        [ForeignKey("RoleId")] public virtual Role Role { get; set; }
        public virtual ICollection<Messages>? Messages { get; set; }
        public virtual ICollection<User_Conversation>? User_Conversations { get; set; }
        public virtual Wallet Wallet { get; set; }
        public virtual ICollection<Item>? Iterms { get; set; }
        public virtual ICollection<Order>? Orders { get; set; }
        public virtual ICollection<Report>? Reports { get; set; }
        public virtual ICollection<Transactions>? Transactions { get; set; }
    }
}
