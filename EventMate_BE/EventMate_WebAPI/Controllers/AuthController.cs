using AutoMapper;
using EventMate_Common.Common;
using EventMate_Common.Status;
using EventMate_Data.Entities;
using EventMate_Service.Services;
using EventMate_WebAPI.ModelsMapping.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
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
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse<string>(400, ResponseKeys.InvalidRequest, "Dữ liệu không hợp lệ."));
                }

                var userRequest = _mapper.Map<User>(model);

                var user = await _authService.LoginAsync(userRequest);

                if (user == null)
                {
                    return Unauthorized(new ApiResponse<string>(401, ResponseKeys.InvalidCredentials, "Email hoặc mật khẩu không chính xác."));
                }
                else if (user.Status.Equals(UserStatus.Inactive))
                {
                    return Unauthorized(new ApiResponse<string>(403, ResponseKeys.AccountDisabled, "Tài khoản của bạn đã bị vô hiệu hóa. Liên hệ hỗ trợ để được giúp đỡ."));
                }

              var token =  _authService.CreateToken(user);
                var userResponse = _mapper.Map<UserResponse>(user);
                return Ok(new ApiResponse<object>(200, ResponseKeys.LoginSuccess, new {user = userResponse,token = token?.Result }));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }
        [HttpPost("login-google")]
        public async Task<IActionResult> Login_Google(LoginGoogleModel loginGoogle)
        {
            try
            {
                IActionResult response;
                // Check if the account exists using email and Google ID
                var user = await _authService.Login_GoogleAsync(loginGoogle.Email, loginGoogle.GoogleId);

                if (user == null)
                {
                    // Map the LoginGoogleModel to a User entity
                    var newUser = _mapper.Map<User>(loginGoogle);
                    newUser.Password = "1@113$2aMGs";
                    // Create a new account
                    user = await _authService.CreateNewAccount(newUser);
                }

                // Return the generated token
                var token = _authService.CreateToken(user);
                var userResponse = _mapper.Map<UserResponse>(user);
                return Ok(new ApiResponse<object>(200, ResponseKeys.LoginSuccess, new { user = userResponse, token = token?.Result }));

            }
            catch (Exception ex)
            {
                // Return a 500 Internal Server Error with a custom error message
                return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred while processing your request.");
            }
        }
        [HttpPost("create-otp")]
        public async Task<IActionResult> CreateOTP(OTPRequest request)
        {
            try
            {
                if (await _authService.IsExistUser(request.Email))
                {
                    return BadRequest(new ApiResponse<string>(400, ResponseKeys.EmailAlreadyExist, "Email already exists"));
                }

                var otp = await _authService.CreateOTP(request.Email, request.Password);

                return Ok(new ApiResponse<string>(200, ResponseKeys.OtpSentSuccessfully, otp.Token));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }
        }
        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOTP(string OTPCode, string token)
        {
            try
            {
                var otp = await _authService.VerifyOTP(OTPCode, token);
                if (otp == null)
                {
                    return BadRequest(new ApiResponse<string>(400, ResponseKeys.OtpInvalid, "OTP is not valid"));
                }

                if (otp.ExpireTime <= DateTime.Now)
                {
                    return BadRequest(new ApiResponse<string>(400, ResponseKeys.OtpExpired, "OTP has expired."));
                }

                return Ok(new ApiResponse<string>(400, ResponseKeys.AccountCreated, "Authentication successful! Account has been created"));
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
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
                return StatusCode(500, new ApiResponse<string>(500, ResponseKeys.ErrorSystem, ex.Message));
            }

        }
    }

}