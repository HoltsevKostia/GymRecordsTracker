using GymProgressTracker.Server.Database;
using GymProgressTracker.Server.Repositories.Repository;

namespace MyVibe.Server.Repositories.Favorite
{
    public class FavoriteRepository : Repository<Models.Domain.Favorite>, IFavoriteRepository
    {
        public FavoriteRepository(AppDbContext dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<Models.Domain.Favorite>> GetAllByUserIdAsync(int userId)
        {
            return await FindAsync(f => f.UserId == userId);
        }

        public async Task<Models.Domain.Favorite?> GetByIdAndUserIdAsync(int id, int userId)
        {
            return await FindOneAsync(f => f.Id == id && f.UserId == userId);
        }
    }
}
