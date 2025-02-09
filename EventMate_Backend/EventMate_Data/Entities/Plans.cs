using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Data.Entities
{
    public class Plans
    {
        [Key]
        public Guid PlanId { get; set; }

        [Required]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        [Required]
        public DateTime Schedule { get; set; }

        [Required]
        public Guid GroupId { get; set; }

        [Required]
        public int Status { get; set; }
    }
}
