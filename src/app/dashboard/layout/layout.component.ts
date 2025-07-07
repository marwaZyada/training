import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { HeaderComponent } from "../../shared/Components/header/header.component";
import { ProgressComponent } from '../../shared/Components/progress/progress.component';
import { CategoryService } from '../clinic-categoriy/category/service/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SharedModule, HeaderComponent,ProgressComponent,CommonModule],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
  constructor(private categoryservice:CategoryService) { }
flag: boolean = false;
ngOnInit(): void {
  this.categoryservice.flag.subscribe(res=>
  {
    this.flag = res;
    console.log(this.flag);
  }
  );
}
}
