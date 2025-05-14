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
        /// Додати новий улюблений елемент (детальний опис)
        /// </summary>
        /// <remarks>
        /// **Приклад запиту:**
        ///
        ///     POST /favorite/add
        ///     {
        ///        "type": 1,
        ///        "content": "https://i.imgur.com/funny-meme.jpg"
        ///     }
        ///
        /// **Пояснення типів:**
        /// - `0` — Image (посилання на зображення)
        /// - `1` — Meme (посилання на мем)
        /// - `2` — Quote (текст цитати)
        ///
        /// **Примітка:** Поля `userId` та `createdAt` встановлюються автоматично на основі JWT і поточного часу.
        ///
        /// **Приклад відповіді (200 OK):**
        ///
        ///     {
        ///         "success": true,
        ///         "message": "Улюблене додано успішно."
        ///     }
        ///
        /// **Приклад відповіді (400 BadRequest):**
        ///
        ///     {
        ///         "error": "Не вдалося додати улюблене."
        ///     }
        /// </remarks>
        /// <param name="dto">Об'єкт, що містить числовий тип (0-2) та контент (URL або текст)</param>
        /// <returns>Результат операції додавання</returns>
        /// <response code="200">Успішне додавання улюбленого</response>
        /// <response code="400">Некоректний запит або помилка при додаванні</response>
        /// <response code="401">Користувач неавторизований</response>
        /// <response code="500">Внутрішня помилка сервера</response>
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
