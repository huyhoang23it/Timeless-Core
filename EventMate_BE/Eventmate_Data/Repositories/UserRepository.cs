using EventMate.Data;
using Eventmate_Data.IRepositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eventmate_Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Guid?> GetRoleIdbyName(string roleName)
        {
            var role = await _context.Role
         .FirstOrDefaultAsync(r => r.RoleName.Equals(roleName));

            return role?.RoleId;
        }

    }
}
