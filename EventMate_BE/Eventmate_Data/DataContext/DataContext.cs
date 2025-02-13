using Eventmate_Data.Entities;
using EventMate_Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace EventMate.Data
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options) { }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			ArgumentNullException.ThrowIfNull(modelBuilder);

			// Xử lý các quy ước chung
			foreach (var entityType in modelBuilder.Model.GetEntityTypes())
			{
				// Đặt tên bảng theo entity (bỏ số nhiều)
				entityType.SetTableName(entityType.DisplayName());

				// Ngăn chặn hành vi xóa liên hoàn (Cascade Delete)
				entityType.GetForeignKeys()
					.Where(fk => fk is { IsOwnership: false, DeleteBehavior: DeleteBehavior.Cascade })
					.ToList()
					.ForEach(fk => fk.DeleteBehavior = DeleteBehavior.Restrict);
			}

			// 🔹 Cấu hình quan hệ giữa Requests và User
			modelBuilder.Entity<Requests>()
				.HasOne(r => r.Sender)
				.WithMany(u => u.SentRequests)
				.HasForeignKey(r => r.SenderId)
				.OnDelete(DeleteBehavior.Restrict);

			modelBuilder.Entity<Requests>()
				.HasOne(r => r.Receiver)
				.WithMany(u => u.ReceivedRequests)
				.HasForeignKey(r => r.ReceiverId)
				.OnDelete(DeleteBehavior.Restrict);

			base.OnModelCreating(modelBuilder);
		}

        #region DbSet
        public DbSet<Comments>? Comments { get; set; }
        public DbSet<Conversations>? Conversations { get; set; }
        public DbSet<Events>? Events { get; set; }
        public DbSet<FeedbackUser>? FeedbackUsers { get; set; }
        public DbSet<Groups>? Groups { get; set; }
        public DbSet<Item>? Item { get; set; }
        public DbSet<Messages>? Messages { get; set; }
        public DbSet<Order>? Orders { get; set; }
        public DbSet<Plan_Details>? Plan_Details { get; set; }
        public DbSet<Plans>? Plans { get; set; }
        public DbSet<Posts>? Posts { get; set; }
        public DbSet<Reactions>? Reactions { get; set; }
        public DbSet<ReplyComments>? ReplyComments { get; set; }
        public DbSet<Report>? Reports { get; set; }
        public DbSet<Requests>? Requests { get; set; }
        public DbSet<Role>? Role { get; set; }
        public DbSet<Transactions>? Transactions { get; set; }
        public DbSet<User>? Users { get; set; }
        public DbSet<User_Conversation>? User_Conversations { get; set; }
        public DbSet<User_Group>? User_Groups { get; set; }
        public DbSet<Wallet>? Wallets { get; set; }
        public DbSet<OTPAuthen> OTPAuthens { get; set; }
        #endregion
    }
}
