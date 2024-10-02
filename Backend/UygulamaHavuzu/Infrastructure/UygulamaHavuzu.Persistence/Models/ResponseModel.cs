using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UygulamaHavuzu.Persistence.Models
{
    public class ResponseModel
    {

        public int responseCode { get; set; }
        public string message { get; set; }
        public string detail { get; set; }

    }
}
