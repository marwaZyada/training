import { Component } from '@angular/core';
import { DrugService } from '../service/drug.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DashboardService } from '../../service/dashboard.service';
import { SelectlistComponent } from "../../../shared/Components/selectlist/selectlist.component";
import { CategoryService } from '../../clinic-categoriy/category/service/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drugoperation',
  standalone: true,
  imports: [ReactiveFormsModule, SelectlistComponent,FormsModule,CommonModule],
  templateUrl: './drugoperation.component.html',
  styleUrl: './drugoperation.component.css'
})
export class DrugoperationComponent {

  drugForm !: FormGroup;
  isActive: boolean = false;
  drug:any = {};
 categories: any[] = [];
 id: string = '';
  status: string = 'create'
  constructor(private service: DrugService, private fb: FormBuilder,private serv:DashboardService,
    private categoryservice:CategoryService,private router:Router,private activatedRoute:ActivatedRoute) {

  }
  ngOnInit(): void {
this.categoryservice.getallcategory().subscribe(
  res=>{
    console.log(res.data);
    this.categories = res.data;}
    
)
 
     this.drugForm = this.fb.group({
      id:[''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      clinicCategoryId: ['', [Validators.required]],
      isActive: [this.isActive]

    })
    

    //get id from route
  
    this.id = this.activatedRoute.snapshot.params['id'];
      console.log(this.id);
      if (this.id !=null) {
        this.status = 'update';
   this.service.getDrugById(this.id).subscribe(
          res => {
            this.drug = res.data;
            console.log(this.drug)
               this.drugForm=this.fb.group({
        id:[this.drug.id],
        name:[this.drug.name] ,  
        description: [this.drug.description],
        clinicCategoryId: [this.drug.clinicCategoryId],
        isActive: [this.drug.isActive]
      })
      console.log(this.drugForm.value);
          });
    
    }
   
    

}
 


  // add/update drug
  onSubmit() {
    //add new drug
console.log(this.drugForm.value);

    if (this.status == 'create') {
    
      console.log(this.drugForm.value);
      this.serv.flag.next(true);
    console.log("flag",this.serv.flag.value)
      this.service.addDrug(this.drugForm.value).subscribe(
        res => {
          this.serv.flag.next(false);
          if (res.success) {
            this.router.navigate(['/dashboard']);
          }
        },
        err => {
          this.serv.flag.next(false);
          // alert(err.error.message);
         
        }
      )
    }
    else if (this.status == 'update') {

     
   
      this.serv.flag.next(true);
      console.log(this.drugForm.value)
      this.service.updateDrug(this.id,this.drugForm.value).subscribe(
        res => {
          this.serv.flag.next(false);
          if (res.success) {
            
            this.status = 'create'; // Reset status to create after update
            this.router.navigate(['/dashboard'])
          }
        },
        err => {
          this.serv.flag.next(false);
          
        })
      

  }

  


   
}

selectchange(event:any) {
console.log(event);
}
}