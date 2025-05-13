using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyVibe.Server.Models.DTO.Favorite;
using MyVibe.Server.Services.Favorite;
using System.Security.Claims;

namespace MyVibe.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class FavoriteController : ControllerBase
    {
        private readonly IFavoriteService _favoriteService;

        public FavoriteController(IFavoriteService favoriteService)
        {
            _favoriteService = favoriteService;
        }

        /// <summary>
        /// Отримати всі улюблені елементи користувача
        /// </summary>
        [Authorize]
        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAll()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var favorites = await _favoriteService.GetFavoritesByUserIdAsync(userId);
            return Ok(favorites);
        }

        /// <summary>
        /// Отримати один улюблений елемент по ID
        /// </summary>
        [Authorize]
        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> Get(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var favorite = await _favoriteService.GetFavoriteByIdAsync(id, userId);

            if (favorite == null)
            {
                return NotFound("Елемент не знайдено або не належить користувачу.");
            }

            return Ok(favorite);
        }

        /// <summary>
        /// Додати новий улюблений елемент
        /// </summary>
        [Authorize]
        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Add([FromBody] AddFavoriteDTO dto)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            dto.UserId = userId;
            dto.CreatedAt = DateTime.UtcNow;

            var success = await _favoriteService.AddFavoriteAsync(dto);
            if (!success)
            {
                return BadRequest("Не вдалося додати улюблене.");
            }

            return Ok(new { success = true, message = "Улюблене додано успішно." });
        }

        /// <summary>
        /// Видалити улюблене за ID
        /// </summary>
        [Authorize]
        [HttpDelete]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
            var success = await _favoriteService.DeleteFavoriteAsync(id, userId);

            if (!success)
            {
                return NotFound("Елемент не знайдено або не належить користувачу.");
            }

            return Ok(new { success = true, message = "Улюблене успішно видалено." });
        }
    }
}
