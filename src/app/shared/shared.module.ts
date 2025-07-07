import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './Components/header/header.component';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent
   
  ],
  exports: [
   HeaderComponent
   
  ]
})
export class SharedModule { }
