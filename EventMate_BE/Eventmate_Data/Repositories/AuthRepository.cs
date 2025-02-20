using EventMate.Data;
using EventMate_Data.Entities;
using EventMate_Data.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Data.Repositories
{
    public class AuthRepository : IAuthRepository
    {

        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User?> IsValidUser(string email, string password)
        {

            // Truy vấn người dùng theo email
            var user = await _context.Users!.FirstOrDefaultAsync(u => u.Email == email);

            // Nếu không tìm thấy người dùng, trả về null
            if (user == null)
            {
                return null;
            }

            // Kiểm tra mật khẩu bằng cách sử dụng BCrypt
            if (BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return user; // Mật khẩu chính xác, trả về người dùng
            }



            return null; // Mật khẩu không chính xác hoặc lỗi xảy ra
        }

        public async Task<string> GetRoleUser(string email)
        {
            if (_context.Users == null)
            {
                return string.Empty;
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (user == null)
            {
                return string.Empty;
            }

            var role = await _context.Role!.FirstOrDefaultAsync(r => r.RoleId == user.RoleId);
            return role != null ? role.RoleName : string.Empty;
        }

        public async Task<User?> Login_Google(string email, string googleId)
        {
            var user = await _context.Users!.FirstOrDefaultAsync(u => u.Email == email && u.GoogleId == googleId);
            if (user != null)
            {
                return user;
            }
            return null;
        }
        public async Task SignUp(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
        public async Task<User?> GetUserByEmail(string email)
        {
            return await _context.Users!.FirstOrDefaultAsync(u => u.Email == email);
        }

    }
}
