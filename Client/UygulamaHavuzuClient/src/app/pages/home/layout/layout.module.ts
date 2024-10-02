import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ComponentsModule } from './components/components.module';
import { CardsModule } from '../cards/cards.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    CardsModule,
    RouterModule,
    ButtonModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule { }
