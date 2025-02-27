using AutoMapper;
using GymProgressTracker.Server.Models.DTO.User;
using GymProgressTracker.Server.Repositories.User;
using GymProgressTracker.Server.Services.User;
using GymProgressTracker.Server.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using GymRecordsTracker.Server.Models.DTO.User;

namespace GymProgressTracker.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] AddUserDTO userDTO)
        {
            var result = await _userService.RegisterAsync(userDTO);

            if (result == null)
            {
                return BadRequest("User already exists.");
            }

            SetAuthCookie(result.Value.Token);

            return Ok(result.Value.User);
        }

        /// <summary>
        /// Авторизація користувача
        /// </summary>
        /// <remarks>
        /// **Приклад запиту:**
        /// 
        ///     POST /user/login
        ///     {
        ///        "email": "test@example.com",
        ///        "password": "123456"
        ///     }
        /// 
        /// **Приклад відповіді (200 OK):**
        /// 
        ///     {
        ///         "id": 1,
        ///         "name": "John Doe",
        ///         "email": "test@example.com",
        ///         "password": "eyJhbGciOiJIUzI1"
        ///     }
        /// 
        /// </remarks>
        /// <param name="userDTO">Об'єкт, що містить email та пароль</param>
        /// <returns>Дані авторизованого користувача</returns>
        /// <response code="200">Успішний вхід, повертається токен</response>
        /// <response code="400">Некоректний запит (наприклад, відсутні обов'язкові поля)</response>
        /// <response code="401">Невірний логін або пароль</response>
        /// <response code="500">Помилка сервера</response>
        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO userDTO)
        {
            var result = await _userService.LoginAsync(userDTO);

            if (result == null)
            {
                return BadRequest("Invalid email or password");
            }

            SetAuthCookie(result.Value.Token);

            return Ok(result.Value.User);
        }

        [Authorize]
        [HttpPost]
        [Route("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("auth_token");
            return Ok(new { success = true, message = "Logged out successfully" });
        }

        [Authorize]
        [HttpGet]
        [Route("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var user = await _userService.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [Authorize]
        [HttpPut]
        [Route("update-email")]
        public async Task<IActionResult> UpdateEmail([FromBody] UpdateUserDTO updateUserDTO)
        {
            var success = await _userService.UpdateEmailAsync(updateUserDTO);

            if (!success)
            {
                return BadRequest("Email is already taken or user not found.");
            }

            return Ok(new { success = true, message = "Email updated successfully." });
        }

        [Authorize]
        [HttpDelete]
        [Route("delete-account")]
        public async Task<IActionResult> DeleteAccount()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var success = await _userService.DeleteUserAsync(userId);

            if (!success)
            {
                return NotFound("User not found.");
            }

            return Ok(new { success = true, message = "Account deleted successfully." });
        }

        private void SetAuthCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddHours(3)
            };

            Response.Cookies.Append("auth_token", token, cookieOptions);
        }
    }
}
