using GymProgressTracker.Server.Models.Domain;
using Microsoft.EntityFrameworkCore;
using MyVibe.Server.Models.Domain;

namespace GymProgressTracker.Server.Database
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Favorite> Favorites { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
