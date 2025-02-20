using EventMate_Common.Status;
using Eventmate_Data.IRepositories;
using EventMate_Data.Entities;
using EventMate_Data.IRepositories;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EventMate_Service.Services
{
    public class AuthService
    {
        private readonly IAuthRepository authRepository;
        private readonly IUserRepository userRepository;
        private readonly IConfiguration _configuration;
        public AuthService(IAuthRepository authRepository, IConfiguration configuration, IUserRepository userRepository)
        {
            this.authRepository = authRepository;
            this.userRepository = userRepository;
            _configuration = configuration;
         
        }

        public async Task<string> LoginAsync(User userMapper)
        {

            //Check email and pass
            var user = await authRepository.IsValidUser(userMapper.Email, userMapper.Password);

            return await CreateToken(user);

        }
        public async Task<string> Login_GoogleAsync(string email, string googleID)
        {

            //Check email and googleID
            var user = await authRepository.Login_Google(email, googleID);

            return await CreateToken(user);

        }
        private async Task<string> CreateToken(User? user)
        {
            if (user == null) return string.Empty;
            if (user.Status == UserStatus.Inactive) return "Inactive";

            //add email to claim
            var authClaims = new List<Claim>
            {
                new(ClaimTypes.Email, user.Email),
                new("userId", user.UserId.ToString()),
                new("username",user.FullName),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            //Get role of user
            var userRole = await authRepository.GetRoleUser(user.Email);
            authClaims.Add(new Claim(ClaimTypes.Role, userRole));



            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]!));

            var jwtService = new JwtService(_configuration["JWT:Secret"]!, _configuration["JWT:ValidIssuer"]!);
            ////Create token
            var token = jwtService.GenerateTokenLogin(authClaims);



            return token;
        }
        public async Task<string> CreateNewAccount(User user)
        {

            // Check if the user already exists
            var existingUser = await authRepository.GetUserByEmail(user.Email);
            if (existingUser == null)
            {
                // Set new user information
                user.CreatedAt = DateTime.Now;
                user.Status = UserStatus.Active;
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                // Get RoleId for role "User"
                var roleId = await userRepository.GetRoleIdbyName("User");
                if (roleId.HasValue)
                {
                    user.RoleId = roleId.Value;
                }

                // SignUp new User
                await authRepository.SignUp(user);

                // Create and gen token
                return await CreateToken(user);
            }
            else
            {
                // Returns a message or value if the user already exists
                throw new InvalidOperationException("User already exists.");
            }
        }

    }


}

