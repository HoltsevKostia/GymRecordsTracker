using System.ComponentModel.DataAnnotations.Schema;

namespace MyVibe.Server.Models.Domain
{
    [Table("Favorite")]
    public class Favorite
    {
        public int Id { get; set; }
        public int UserId { get; set; } 
        public FavoriteType Type { get; set; }
        public string Content { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    }
}
