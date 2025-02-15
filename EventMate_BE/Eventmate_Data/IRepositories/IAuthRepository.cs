using Eventmate_Data.Entities;
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
        public Task<User?> IsValidUser(string email, string password);
        public Task<User?> Login_Google(string email, string googleId);
        public Task<string> GetRoleUser(string email);
        public Task SignUp(User user);
        public Task<User?> GetUserByEmail(string email);
        public Task<OTPAuthen> CreateOTP(string email, string password);
        public Task<OTPAuthen> CheckOTP(string OTPCode,string token);
 

    }
}
