using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UygulamaHavuzu.Persistence.Contexts;

namespace UygulamaHavuzu.Persistence
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<UygulamaHavuzuDbContext>
    {
        public UygulamaHavuzuDbContext CreateDbContext(string[] args) 
        {

            DbContextOptionsBuilder<UygulamaHavuzuDbContext> dbContextOptionsBuilder = new();
            dbContextOptionsBuilder.UseNpgsql(Configuration.ConnectionString);
            return new(dbContextOptionsBuilder.Options);
        }
    }
}
