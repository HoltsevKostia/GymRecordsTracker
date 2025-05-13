using GymProgressTracker.Server.Repositories.Repository;
using MyVibe.Server.Models.Domain;

namespace MyVibe.Server.Repositories.Favorite
{
    public interface IFavoriteRepository : IRepository<Models.Domain.Favorite>
    {
        Task<IEnumerable<Models.Domain.Favorite>> GetAllByUserIdAsync(int userId);
        Task<Models.Domain.Favorite?> GetByIdAndUserIdAsync(int id, int userId);
    }
}
