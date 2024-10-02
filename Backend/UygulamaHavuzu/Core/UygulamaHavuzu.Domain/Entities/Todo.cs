using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UygulamaHavuzu.Domain.Entities.Common;

namespace UygulamaHavuzu.Domain.Entities
{
    public class Todo: BaseEntity
    {
        public string? Title {  get; set; }  
        public string? Description { get; set; }
        public DateTime Created { get; set; }
        public bool IsCompleted { get; set; }
        //Foreign Key
        public Guid UserId { get; set; } 

        public User? User { get; set; }  

    }
}
