using EventMate_Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Data.IRepositories
{
    public interface IAuthRepository
    {
        public Task<User?> Login(string email, string password);
        public Task<string> GetRoleUser(string email);
    }
}
