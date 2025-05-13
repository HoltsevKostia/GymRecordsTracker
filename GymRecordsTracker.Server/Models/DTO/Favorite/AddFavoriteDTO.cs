using MyVibe.Server.Models.Domain;

namespace MyVibe.Server.Models.DTO.Favorite
{
    public class AddFavoriteDTO
    {
        public int UserId { get; set; }
        public FavoriteType Type { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
