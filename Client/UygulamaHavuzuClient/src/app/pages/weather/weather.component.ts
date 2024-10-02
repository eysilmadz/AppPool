import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})
export class WeatherComponent implements OnInit {
  cityWeather: any;
  majorCitiesWeather: any[] = [];
  searchCity: string = '';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeather('Bolu');
    this.getMajorCitiesWeather();
  }

  getWeather(city?: string): void {
    const cityName = city || this.searchCity; // Eğer bir şehir parametresi verilmişse, onu kullanıyorum
  
    if (cityName) {
      this.weatherService.getWeather(cityName).subscribe({
        next: (data) => {
          this.cityWeather = data;
        },
        error: (err) => {
          console.error('Veri alınırken hata oluştu.', err);
        },
        complete: () => {
          console.log(`${cityName} için hava durumu bilgisi başarıyla alındı.`);
        }
      });
    }
  }
  
  
  getMajorCitiesWeather(): void {
    this.weatherService.getMajorCitiesWeather().subscribe({
      next: (data) => {
        this.majorCitiesWeather = data;
        console.log(data)
      },
      error: (err) => {
        console.error('Veri alınırken hata oluştu.', err);
      },
      complete: () => {
        console.log('Major cities weather data retrieval complete.');
      }
    });
  }

  //Arama butonuna tıklama işlevi
  onSearch(): void {
    this.getWeather();
  }
  
}

