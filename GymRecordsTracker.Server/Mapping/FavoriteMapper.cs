using AutoMapper;
using MyVibe.Server.Models.Domain;
using MyVibe.Server.Models.DTO.Favorite;

namespace MyVibe.Server.Mapping
{
    public class FavoriteMapper : Profile
    {
        public FavoriteMapper()
        {
            CreateMap<Favorite, FavoriteDTO>();
            CreateMap<AddFavoriteDTO, Favorite>();
        }
    }
}
