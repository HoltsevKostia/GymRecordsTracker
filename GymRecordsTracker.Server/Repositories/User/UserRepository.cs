using GymProgressTracker.Server.Database;
using GymProgressTracker.Server.Models.DTO.User;
using GymProgressTracker.Server.Repositories.Repository;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace GymProgressTracker.Server.Repositories.User
{
    public class UserRepository : Repository<Models.Domain.User>, IUserRepository
    {
        public UserRepository(AppDbContext dbContext) : base(dbContext) { }

        public async Task<Models.Domain.User> GetByEmailAndPassword(string email, string password)
        {
            var user = await FindOneAsync(x => x.Email == email);
            if (user == null)
            {
                return null;
            }

            if (password != user.Password)
            {
                return null;
            }

            return user;
        }

        public async Task<bool> UpdateEmailAsync(int userId, string newEmail)
        {
            if (await IsEmailTaken(newEmail))
            {
                return false;
            }
            var user = await GetByIdAsync(userId);
            if (user == null)
            {
                return false;
            }

            user.Email = newEmail;
            await UpdateAsync(user);
            return true;
        }

        public async Task<bool> IsEmailTaken(string email)
        {
            var user = await FindOneAsync(x => x.Email == email);

            if (user == null)
            {
                return false;
            }

            return true;
        }

        public async Task<bool> IsUsernameTaken(string username)
        {
            var user = await FindOneAsync(x => x.Username == username);

            if (user == null)
            {
                return false;
            }

            return true;
        }
    }
}
