using GymProgressTracker.Server.Repositories.Repository;
using MyVibe.Server.Models.Domain;

namespace MyVibe.Server.Repositories.User
{
    public interface IFavoriteRepository : IRepository<Favorite>
    {
        Task<IEnumerable<Favorite>> GetAllByUserIdAsync(int userId);
        Task<Favorite?> GetByIdAndUserIdAsync(int id, int userId);
    }
}
