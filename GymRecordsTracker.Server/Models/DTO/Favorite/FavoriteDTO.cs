using MyVibe.Server.Models.Domain;

namespace MyVibe.Server.Models.DTO.Favorite
{
    public class FavoriteDTO
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public FavoriteType Type { get; set; }
        public string Content { get; set; }
    }
}
