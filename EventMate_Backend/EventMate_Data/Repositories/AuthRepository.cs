using EventMate.Data;
using EventMate_Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Data.Repositories
{
    public class AuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<User?> IsValidUser(string email, string password)
        {

            var user = await _context.Users!.FirstOrDefaultAsync(u => u.Email == email);
        
            if (user == null)
            {
                return null;
            }

            if (BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return user; 
            }

            return null; 
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
    }
}
