using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using UygulamaHavuzu.Persistence.Models;

namespace UygulamaHavuzu.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public WeatherController(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        [HttpGet("city")]
        public async Task<IActionResult> GetWeather(string city)
        {

            string apiKey = "859cc97c413016dc0189fabdc46892f9";
            string url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&lang=tr";

            var response= await _httpClient.GetAsync(url);
            if(response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                var weather = JsonConvert.DeserializeObject<WeatherModel>(data);
                return Ok(weather);
            }
            return BadRequest("Veri alınamadı.");
        }

        [HttpGet("bigCities")]
        public async Task<IActionResult> GetMajorCitiesWeather()
        {
            string[] cities = { "London", "Istanbul", "Berlin", "Paris" };

            var weatherList = new List<WeatherModel>();

            foreach (var city in cities)
            {
                string apiKey = "859cc97c413016dc0189fabdc46892f9";
                string url = $"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={apiKey}&&lang=tr";

                var response = await _httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    var weather = JsonConvert.DeserializeObject<WeatherModel>(data);
                    weatherList.Add(weather);
                }
            }
            return Ok(weatherList);
        }
    }
}
