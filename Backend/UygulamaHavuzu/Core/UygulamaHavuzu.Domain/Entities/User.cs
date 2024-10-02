using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UygulamaHavuzu.Domain.Entities.Common;

namespace UygulamaHavuzu.Domain.Entities
{
    public class User: BaseEntity
    {
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string PasswordHash { get; set; }

        public ICollection <Todo> Todos { get; set; }
    }
}
