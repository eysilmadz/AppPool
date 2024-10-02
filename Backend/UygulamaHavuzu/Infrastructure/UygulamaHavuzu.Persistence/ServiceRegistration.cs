using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UygulamaHavuzu.Application.Abstractions;
using UygulamaHavuzu.Persistence.Contexts;

namespace UygulamaHavuzu.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceServices( this IServiceCollection services)
        {
            services.AddDbContext<UygulamaHavuzuDbContext>(options => options.UseNpgsql(Configuration.ConnectionString));
        }
    }
}
