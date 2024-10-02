import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './pages/todo/todo.component';
import { BmiComponent } from './pages/bmi/bmi.component';
import { WeatherComponent } from './pages/weather/weather.component';
import { QuotesComponent } from './pages/quotes/quotes.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LayoutComponent } from './pages/home/layout/layout.component';
import { BlockGuard } from './guards/block.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, //Uygulama açıldığında direkt login gelmesi için
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'layout', component: LayoutComponent, },
  { path: 'todo', component: TodoComponent, },
  { path: 'bmi', component: BmiComponent,  },
  { path: 'weather', component: WeatherComponent,  },
  { path: 'quotes', component: QuotesComponent,  },
  { path: '**', redirectTo: 'layout'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

