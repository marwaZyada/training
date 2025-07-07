import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [    MatProgressBarModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent {

}
