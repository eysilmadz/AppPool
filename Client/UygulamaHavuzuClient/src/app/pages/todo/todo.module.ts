import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './todo.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    TodoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    ToastModule,
    DividerModule,
    SplitButtonModule,
    InputTextareaModule,
    FloatLabelModule,
    InputTextModule
  ],
  exports: [
    TodoComponent
  ]
})
export class TodoModule { }
