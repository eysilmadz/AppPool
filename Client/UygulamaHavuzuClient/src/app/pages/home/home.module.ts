import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { CardsModule } from './cards/cards.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { ButtonModule } from 'primeng/button';
import { BlockGuard } from '../../guards/block.guard';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    RouterModule,
    ButtonModule
  ],
  exports: [
    LayoutModule,
  ],
})
export class HomeModule { }
