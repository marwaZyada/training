import { CommonModule } from '@angular/common';
import { Component, OnInit,ChangeDetectionStrategy,signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import {MatIconModule} from '@angular/material/icon';
import { SharedModule } from "../../../shared/shared.module";
import { ProgressComponent } from "../../../shared/Components/progress/progress.component";


@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, ReactiveFormsModule,
    MatIconModule, SharedModule, ProgressComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
  templateUrl: './login.component.html',
styleUrl: './login.component.css'
})


export class LoginComponent implements OnInit {
loginform!:FormGroup;
flag:boolean = false;

 hide = signal(true);
  constructor(private fb:FormBuilder,private service:AuthService,private route:Router) { }
 ngOnInit() {
    this.loginform = this.fb.group({
      emailOrUsername: ['',[Validators.required, Validators.email]],
      clinicCode: ['',[Validators.required]],
      password: ['',[Validators.required, Validators.minLength(6)]]
    });
 this.flag=false
  } 

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  onSubmit() {
     this.flag=true;
  
this.service.login(this.loginform.value).subscribe(
   (response) => {
    this.flag=false
    if(response.success){
     
        console.log('Login successful:', response.data.token);
        localStorage.setItem('token', response.data.token);
        this.service.DecodeuserData();
        console.log('Decoded user data:', this.service.userData);
        this.route.navigate(['/dashboard']);
        // You can navigate to another page or perform other actions here
      }
      else
      this.flag=false
    }
       
      ,
     (er) => {
          this.flag=false
      console.log( er.error.message ? er.error.message : 'An error occurred');
    console.log(this.flag);

        
      }
    );

}

}
