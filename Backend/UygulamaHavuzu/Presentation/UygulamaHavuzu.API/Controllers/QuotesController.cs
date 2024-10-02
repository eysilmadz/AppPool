using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace UygulamaHavuzu.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuotesController : ControllerBase
    {
        private static readonly string[] Quotes = new[]
    {
        "Zafer, zafer benimdir diyebilenindir. Başarı ise “başaracağım” diye başlayarak sonunda “başardım diyenindir. - Mustafa Kemal Atatürk",
        "Kazanma isteği ve başarıya ulaşma arzusu birleşirse kişisel mükemmelliğin kapısını açar. - Konfüçyüs",
        "Hiçbir şeyden vazgeçme, çünkü sadece kaybedenler vazgeçer. - Abraham Lincoln",
        "Başarıya çıkan asansör bozuk. Bekleyerek zaman kaybetmeyin, adım adım merdivenleri çıkmaya başlayın. - Joe Girard",
        "Fırsatlar durup dururken karşınıza çıkmaz, onları siz yaratırsınız. - Chris Grosser",
        "Şansa çok inanırım ve ne kadar çok çalıştıysam ona o kadar çok sahip oldum. - Thomas Jefferson",
        "Bir şeye başlayıp başarısız olmaktan daha kötü tek şey hiçbir şeye başlamamaktır. - Seth Godin",
        "Sadece sınırlarını aşmanın riskini alanlar ne kadar ileri gidebildiklerini görürler. - T.S. Elliot",
        "Hayat her ne kadar zor görünse de, yapabileceğimiz ve başarabileceğimiz bir şey mutlaka vardır. - Stephen Hawking",
        "Bir şeyi başarmak ne kadar zorsa, zaferin tadı o kadar güzeldir. - Pele",
        "Bir şeye başlayıp başarısız olmaktan daha kötü tek şey hiçbir şeye başlamamaktır. - Seth Godin",
        "Hiç kimse başarı merdivenine elleri cebinde tırmanmamıştır. - J. Keth Moorhead",
        "Ne zaman başarılı bir iş görseniz, birisi bir zamanlar mutlaka cesur bir karar almıştır. - Peter Ducker",
        "Sessizce sıkı çalışın, bırakın başarı sesiniz olsun. - Frank Ocean",
        "Eğer her şey kontrol altında gibi görünüyorsa, yeterince hızlı gitmiyorsunuzdur. - Mario Andretti",
        "Başarısız insanlar içerisinde bulundukları duruma göre karar verirler. Başarılı insanlar ise olmak istedikleri yere göre karar verirler. - Benjamin Hardy",
        "Sadece başarılı bir insan olmaya değil, değerli bir insan olmaya çalışın. - Albert Einstein"
    };

        [HttpGet("random")]
        public IActionResult GetRandomQuote()
        {
            var random = new Random();
            var quote = Quotes[random.Next(Quotes.Length)];
            return Ok(new { quote });
        }
    }
}
