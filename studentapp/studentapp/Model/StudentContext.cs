using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace studentapp.Model
{
    public class StudentContext : DbContext
    {
        public StudentContext(DbContextOptions<StudentContext> options) : base(options)
        {
        }
        public DbSet<Student> Students { get; set; }


    }
}
