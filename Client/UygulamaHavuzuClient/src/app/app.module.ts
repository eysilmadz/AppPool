import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuotesModule } from './pages/quotes/quotes.module';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { BaseService } from './services/base.service';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { BlockGuard } from './guards/block.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    ButtonModule,
    BrowserAnimationsModule,
    QuotesModule,
    InputGroupModule,
    InputGroupAddonModule,
    HttpClientModule, 
    ReactiveFormsModule,
    InputTextModule,

  ],
  providers: [
    provideClientHydration(),
    BaseService,
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
