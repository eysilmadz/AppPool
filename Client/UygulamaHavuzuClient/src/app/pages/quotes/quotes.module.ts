import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesComponent } from './quotes.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    QuotesComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    CardModule,
    DividerModule,
    ToastModule
  ],
  exports: [
    QuotesComponent
  ]
})
export class QuotesModule { }
