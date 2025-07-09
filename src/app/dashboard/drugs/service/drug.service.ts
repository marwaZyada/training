import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrugService {
url=environment.apiUrl;
headers = {
  Authorization: `Bearer ${localStorage.getItem('token') || ''}`
}
  constructor(private http:HttpClient) { }


  //get all drugs
  getAllDrugs(categoryId?:string):Observable<any> {
    return this.http.get(`${this.url}/drugs?ClinicCategoryId=${categoryId}`, {headers:this.headers}); // Replace with your actual API endpoint
  }
  //add new drug
  addDrug(data:any):Observable<any> {
    return this.http.post(`${this.url}/drugs`, data, {headers:this.headers}); // Replace with your actual API endpoint
  }
  //update drug
  updateDrug(id:string, data:any):Observable<any> {
    return this.http.put(`${this.url}/drugs/${id}`, data, {headers:this.headers}); // Replace with your actual API endpoint
  }
  //delete drug
  deleteDrug(id:string):Observable<any> {
    return this.http.delete(`${this.url}/drugs/${id}`, {headers:this.headers}); // Replace with your actual API endpoint
}
// get drug by id
getDrugById(id:string):Observable<any> {
  return this.http.get(`${this.url}/drugs/${id}`, {headers:this.headers}); // Replace with your actual API endpoint 
}
}
