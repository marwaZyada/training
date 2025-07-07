import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 userData=new BehaviorSubject<any>(null);
url=environment.apiUrl;
  constructor(private http:HttpClient) {
    if(localStorage.getItem('token')!== null){
      this.DecodeuserData();
    }
    console.log(environment.apiUrl)
   }

  login(data: any):Observable<any> {
    //return this.http.post('https://localhost:44314/v1/api/signin', data);
        return this.http.post(`${this.url}/signin`, data);

  }

  DecodeuserData(){
let token =JSON.stringify(localStorage.getItem('token')!);
let decodedData=jwtDecode(token);
this.userData.next(decodedData);
  }
}
