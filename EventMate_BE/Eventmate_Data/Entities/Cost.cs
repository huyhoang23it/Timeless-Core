using EventMate_Common.Status;
using EventMate_Data.Entities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Eventmate_Data.Entities
{
    public class Cost
    {
        [Key]
        public Guid CostId { get; set; }

        [Required]
        public Guid ActivityId { get; set; }

        [Required]
        public Guid PayerId { get; set; } 

        public string Description { get; set; } = string.Empty;

        [Required]
        public decimal CostAmount { get; set; } 

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public Guid CreatedBy { get; set; }

        [Required]
        public CostStatus Status { get; set; } 

        // Khóa ngoại
        [ForeignKey("ActivityId")]
        public virtual Activity Activity { get; set; }

        [ForeignKey("PayerId")]
        public virtual User Payer { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual User Creator { get; set; }
    }
}
