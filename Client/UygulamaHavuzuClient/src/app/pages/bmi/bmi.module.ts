import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmiComponent } from './bmi.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BmiComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    FormsModule
  ],
  exports: [
    BmiComponent
  ]
})
export class BmiModule { }
