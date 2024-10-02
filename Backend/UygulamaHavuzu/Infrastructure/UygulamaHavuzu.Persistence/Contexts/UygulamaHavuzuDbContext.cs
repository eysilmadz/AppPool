using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UygulamaHavuzu.Domain.Entities;

namespace UygulamaHavuzu.Persistence.Contexts
{
    public class UygulamaHavuzuDbContext : DbContext
    {
        public UygulamaHavuzuDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Todo> Todos { get; set; }

        public DbSet<User> Users { get; set; }
    }
}
