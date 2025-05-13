using AutoMapper;
using GymProgressTracker.Server.Database;
using GymProgressTracker.Server.Repositories.Repository;
using MyVibe.Server.Models.DTO.Favorite;
using MyVibe.Server.Services.Favorite;

namespace MyVibe.Server.Repositories.Favorite
{
    public class FavoriteService : IFavoriteService
    {
        private readonly IFavoriteRepository _favoriteRepository;
        private readonly IMapper _mapper;

        public FavoriteService(IFavoriteRepository favoriteRepository, IMapper mapper)
        {
            _favoriteRepository = favoriteRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<FavoriteDTO>> GetFavoritesByUserIdAsync(int userId)
        {
            var favorites = await _favoriteRepository.GetAllByUserIdAsync(userId);
            var result = favorites.Select(f => _mapper.Map<FavoriteDTO>(f));
            return result;
        }

        public async Task<FavoriteDTO?> GetFavoriteByIdAsync(int id, int userId)
        {
            var favorite = await _favoriteRepository.GetByIdAndUserIdAsync(id, userId);
            var result = favorite == null ? null : _mapper.Map<FavoriteDTO>(favorite);
            return result;
        }

        public async Task<bool> AddFavoriteAsync(AddFavoriteDTO favoriteDTO)
        {
            var favorite = _mapper.Map<Models.Domain.Favorite>(favoriteDTO);
            await _favoriteRepository.AddAsync(favorite);
            return true;
        }

        public async Task<bool> DeleteFavoriteAsync(int id, int userId)
        {
            var favorite = await _favoriteRepository.GetByIdAndUserIdAsync(id, userId);
            if (favorite == null)
            {
                return false;
            }

            await _favoriteRepository.DeleteAsync(favorite);
            return true;
        }
    }

}
