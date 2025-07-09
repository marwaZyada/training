import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../../../interface/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
   url=environment.apiUrl;
  headers = new HttpHeaders({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
  });
  flag= new BehaviorSubject(false) ;
  constructor(private http:HttpClient) { 
 console.log(localStorage.getItem('token'));
  }

  // get all categories
  getallcategory():Observable<any> {
    return this.http.get(`${this.url}/cliniccategories`,{
      headers: this.headers
    });
  }

  // add new category
  addCategory(data:Category):Observable<any> {
    return this.http.post(`${this.url}/cliniccategories`, data, {
      headers: this.headers
    });
  }

  // update category
  updateCategory(id:string, data:Category):Observable<any> {
    return this.http.put(`${this.url}/cliniccategories/${id}`, data, {
      headers: this.headers
    });
  }

  // delete category
  deleteCategory(id:number):Observable<any> { 
    return this.http.delete(`${this.url}/cliniccategories/${id}`, {
      headers: this.headers
    });
  }
}
