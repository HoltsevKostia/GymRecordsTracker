using MyVibe.Server.Models.DTO.Favorite;

namespace MyVibe.Server.Services.User
{
    public interface IFavoriteService
    {
        Task<IEnumerable<FavoriteDTO>> GetFavoritesByUserIdAsync(int userId);
        Task<FavoriteDTO?> GetFavoriteByIdAsync(int id, int userId);
        Task<bool> AddFavoriteAsync(AddFavoriteDTO favoriteDTO);
        Task<bool> DeleteFavoriteAsync(int id, int userId);
    }
}
