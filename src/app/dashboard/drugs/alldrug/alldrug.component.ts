import {CommonModule } from '@angular/common';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { DrugService } from '../service/drug.service';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../service/dashboard.service';
import { SelectlistComponent } from "../../../shared/Components/selectlist/selectlist.component";
import { CategoryService } from '../../clinic-categoriy/category/service/category.service';

import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-alldrug',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, RouterModule, SelectlistComponent,FormsModule],
  templateUrl: './alldrug.component.html',
  styleUrl: './alldrug.component.css'
})
export class AlldrugComponent implements AfterViewInit,OnInit{
drugs:any[]=[];
categories:any[]=[];
id=''
// [{name:'Paracetamol', description:'Pain reliever and fever reducer', price:5.99},
//   {name:'Aspirin', description:'Pain reliever and anti-inflammatory', price:10.99},
//   {name:'Ibuprofen', description:'Nonsteroidal anti-inflammatory drug (NSAID)', price:8.99},
//   {name:'Amoxicillin', description:'Antibiotic used to treat bacterial infections', price:15.99},
//   {name:'Metformin', description:'Medication for type 2 diabetes management', price:12.99},
//   {name:'Lisinopril', description:'Medication for high blood pressure', price:14.99},
//   {name:'Atorvastatin', description:'Cholesterol-lowering medication', price:20.99},]
   dataSource = new MatTableDataSource(this.drugs);
constructor(private service:DrugService,private serv:DashboardService,private categoryservice:CategoryService

) {}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
ngOnInit(): void {
    this.getAllDrugs();
  this.categoryservice.getallcategory().subscribe(res=>
    this.categories=res.data
  )
     console.log(this.id);
}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
 //getAllDrugs
 getAllDrugs(id?:string) {

this.service.getAllDrugs(id).subscribe(res=>
  {this.drugs = res.data;
  console.log(res)
  this.dataSource = new MatTableDataSource(this.drugs);
  this.dataSource.paginator = this.paginator;}
);
 }


   //delete drug
    delete (id: string) {
      this.serv.flag.next(true);
      console.log(id);
      this.service.deleteDrug(id).subscribe(
        res => {
          this.serv.flag.next(false);
    
        this.getAllDrugs()
        },
        err => {
          this.serv.flag.next(false);
         
        }


      )
    }

    //filtration
    getbycategoryid($event:any){
console.log($event.target.value)
this.id=$event.target.value;
if(this.id!=null)
  this.getAllDrugs(this.id)
    }
}
