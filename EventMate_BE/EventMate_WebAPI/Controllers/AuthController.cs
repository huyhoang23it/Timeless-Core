using AutoMapper;
using EventMate_Common.Status;
using EventMate_Data.Entities;
using EventMate_Service.Services;
using EventMate_WebAPI.ModelsMapping;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.InteropServices;
using static System.Net.WebRequestMethods;

namespace EventMate_WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly IMapper _mapper;
        public AuthController(AuthService authService, IMapper mapper)
        {
            _authService = authService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> LogIn(LoginModel model)
        {
            IActionResult response;

            //InValid Model
            if (!ModelState.IsValid)
            {
                response = BadRequest();
            }
            //mapper loginmodel to user
            var user = _mapper.Map<User>(model);

            //Check acc and create token
            var token = await _authService.LoginAsync(user);

            //Invalid account and returned emtry
            if (string.IsNullOrEmpty(token))
            {
                response = Unauthorized(new { message = "Either email address or password is incorrect. Please try again" });
            }
            else if (token.Equals(UserStatus.Inactive))
            {
                response = Unauthorized(new { message = "Your account is disabled. Contact us for help." });
            }
            else
            {
                response = Ok(new {token =  token });
            }

            return response;
        }
        [HttpPost("create-otp")]
        public async Task<IActionResult> CreateOTP(OTPRequest request)
        {
            try
            {
                if (await _authService.IsExistUser(request.Email))
                {
                    return BadRequest(new { message = "Email đã tồn tại" });
                }

                var otp = await _authService.CreateOTP(request.Email , request.Password);

                return Ok(new { message = otp.Token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }
        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOTP( string OTPCode, string token)
        {
            try
            {
                var otp = await _authService.VerifyOTP(OTPCode, token);
                if (otp == null)
                {
                    return BadRequest(new { message = "OTP không hợp lệ." });
                }

                if (otp.ExpireTime <= DateTime.Now)
                {
                    return BadRequest(new { message = "OTP đã hết hạn." });
                }

                return Ok(new { message = "Xác thực thành công! Tài khoản đã được tạo." });
            }       
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }


        [HttpPost("sign-up")]
        public async Task<IActionResult> SignUp(SignUpModel signUpModel)
        {
            try
            {
                IActionResult response;
                var user = _mapper.Map<User>(signUpModel);

                var token = await _authService.CreateNewAccount(user);
                response = Ok(new { token });
                return response;
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

    }
}
