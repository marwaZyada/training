import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { HeaderComponent } from "../../shared/Components/header/header.component";

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SharedModule, HeaderComponent],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
