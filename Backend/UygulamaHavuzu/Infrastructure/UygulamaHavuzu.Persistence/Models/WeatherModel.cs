using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UygulamaHavuzu.Persistence.Models
{
    public class WeatherModel
    {
        public Main? Main { get; set; }
        public Weather[]? Weather { get; set; }
        public Wind? Wind { get; set; }
        public Sys? Sys { get; set; }
        public string? Name { get; set; }
    }

    public class Main
    {
        public float Temp { get; set; }
        public int Humidity { get; set; }
    }

    public class Wind
    {
        public double Speed { get; set; }
    }

    public class Weather
    {
        public string? Description { get; set; }
        public string? Icon { get; set; }
    }

    public class Sys
    {
        public string? Country { get; set; }
        public long Sunrise { get; set; }
        public long Sunset { get; set; }
    }
}
