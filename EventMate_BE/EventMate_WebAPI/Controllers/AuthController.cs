using AutoMapper;
using EventMate_Data.Entities;
using EventMate_Service.Services;
using EventMate_WebAPI.ModelsMapping;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost("Login")]
        public async Task<IActionResult> LogIn(LoginModel model)
        {
            IActionResult response;

            //InValid Model
            if (!ModelState.IsValid)
            {
                response = BadRequest();
                if (!ModelState.IsValid)
                {
                    return BadRequest();
                }

                var userRequest = _mapper.Map<User>(model);

                var user = await _authService.LoginAsync(userRequest);

                if (user == null)
                {
                    return Unauthorized();
                }
                else if (user.Status.Equals(UserStatus.Inactive))
                {
                    return Forbid();
                }

              var token =  _authService.CreateToken(user);
                var userResponse = _mapper.Map<UserResponse>(user);
                return Ok(new ApiResponse<object>(200, ResponseKeys.LoginSuccess, new {user = userResponse,token = token?.Result }));
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
            else if (token.Equals("Inactive"))
            {
                response = Unauthorized(new { message = "Your account is disabled. Contact us for help." });
            }
            else
            {
                response = Ok(new { token });
            }

            return response;
        }

        [HttpPost("SignUp")]
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

                return BadRequest(new { message = ex.Message });
            }
        }

    }
}
