import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';
import { BmiModule } from './bmi/bmi.module';
import { RouterModule } from '@angular/router';
import { QuotesModule } from './quotes/quotes.module';
import { TodoModule } from './todo/todo.module';
import { WeatherModule } from './weather/weather.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BlockGuard } from '../guards/block.guard';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    AuthModule,
    RouterModule,
    QuotesModule,
    BmiModule,
    TodoModule,
    WeatherModule,
    ButtonModule,
    InputTextModule,
  ],
  exports: [
    HomeModule,
    AuthModule,
    QuotesModule,
    BmiModule,
    TodoModule,
    WeatherModule
  ],
  
})
export class PagesModule { }
