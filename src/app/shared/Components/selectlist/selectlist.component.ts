import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-selectlist',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './selectlist.component.html',
  styleUrl: './selectlist.component.css'
})
export class SelectlistComponent {
@Input() items: any[] = [];
@Output() selectedItem = new EventEmitter<string>();



 SelectChange(id: string) {
   console.log(id);
    this.selectedItem.emit(id);
  }

}
