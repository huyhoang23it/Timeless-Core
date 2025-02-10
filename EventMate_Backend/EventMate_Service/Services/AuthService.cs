using EventMate_Common.Status;
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
        private readonly IConfiguration _configuration;
        public AuthService(IAuthRepository authRepository, IConfiguration configuration)
        {
            this.authRepository = authRepository;       
            _configuration = configuration;
        }
        public async Task<string> LoginAsync(User userMapper)
        {

            //Check email and pass
            var user = await authRepository.Login(userMapper.Email, userMapper.Password);

            return await CreateToken(user);

        }
        private async Task<string> CreateToken(User? user)
        {
            if (user == null) return string.Empty;
            if (user.Status == UserStatus.Inactive) return UserStatus.Inactive.ToString();

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
    }
}
