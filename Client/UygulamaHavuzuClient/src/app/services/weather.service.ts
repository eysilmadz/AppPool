import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends BaseService {

  private controllerUrl: string = "/weather";

  constructor(private base: BaseService) {
    super(base.http);
  }

  // Şehrin hava durumu için HTTP GET isteği yapar
  public getWeather(city: string): Observable<any> {
    return this.base.getReq(`${this.controllerUrl}/city?city=${city}`);
  }

  // Büyük şehirlerin hava durumu için HTTP GET isteği yapar
  public getMajorCitiesWeather(): Observable<any[]> {
    return this.base.getReq(`${this.controllerUrl}/bigCities`);
  }
}
