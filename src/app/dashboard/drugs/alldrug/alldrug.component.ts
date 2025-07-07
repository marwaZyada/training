import {CommonModule } from '@angular/common';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-alldrug',
  standalone: true,
  imports: [CommonModule,MatTableModule, MatPaginatorModule],
  templateUrl: './alldrug.component.html',
  styleUrl: './alldrug.component.css'
})
export class AlldrugComponent implements AfterViewInit{
drugs:any[]=[
{name:'Paracetamol', description:'Pain reliever and fever reducer', price:5.99},
  {name:'Aspirin', description:'Pain reliever and anti-inflammatory', price:10.99},
  {name:'Ibuprofen', description:'Nonsteroidal anti-inflammatory drug (NSAID)', price:8.99},
  {name:'Amoxicillin', description:'Antibiotic used to treat bacterial infections', price:15.99},
  {name:'Metformin', description:'Medication for type 2 diabetes management', price:12.99},
  {name:'Lisinopril', description:'Medication for high blood pressure', price:14.99},
  {name:'Atorvastatin', description:'Cholesterol-lowering medication', price:20.99},]
   dataSource = new MatTableDataSource(this.drugs);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
