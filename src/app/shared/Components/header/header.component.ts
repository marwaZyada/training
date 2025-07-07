import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  username='';
constructor(private authservice:AuthService,private route:Router) { }
ngOnInit(): void {
let user=  this.authservice.userData.value
console.log(user);
    this.username = user.unique_name.split('@')[0]|| '';
 
}
signout(){
  localStorage.removeItem('token');
  console.log('User signed out');
  this.route.navigate(['/auth/login']);
}
}
