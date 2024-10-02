using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UygulamaHavuzu.Application.Abstractions
{
    public interface IConfigureServices
    {
        public void ConfigureServices(IServiceCollection services);
    }
}
