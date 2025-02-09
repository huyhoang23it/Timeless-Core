using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Data.Entities
{
    public class Order
    {
        [Key]
        public Guid OrderId { get; set; } 

        [Required]
        public decimal TotalPrice { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public Guid UserId { get; set; }

        public DateTime? TimeEnd { get; set; }

        [Required]
        public Guid ItemId { get; set; }

        [Required]
        public int Status { get; set; }
    }
}
