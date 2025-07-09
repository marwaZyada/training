import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from './service/category.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProgressComponent } from "../../../shared/Components/progress/progress.component";
import { Category } from '../../interface/category.model';
import { DashboardService } from '../../service/dashboard.service';
@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ProgressComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  categories: any[] = [];
  categoryForm !: FormGroup;
  isActive: boolean = false;
  @ViewChild('myModal') modalElement!: ElementRef;
  status: string = 'create'
  constructor(private service: CategoryService, private fb: FormBuilder,private serv:DashboardService) {

  }
  ngOnInit(): void {
    this.getAllCategories();
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      note: ['', [Validators.required]],
      categoryVAT: ['', [Validators.required]],
      isActive: [this.isActive]

    })

  }
  // get all categories
  getAllCategories() {
    this.service.getallcategory().subscribe(
      res => {
        console.log(res.data);
        this.categories = res.data;
      },
      err => {
        console.log(err);
      }
    )
  }


  // add/update category
  onSubmit() {
    //add new category

    const modal = (window as any).bootstrap.Modal.getInstance(this.modalElement.nativeElement);

    if (this.status == 'create') {
    
      console.log(this.categoryForm.value);
      this.serv.flag.next(true);
      // Access Bootstrap Modal from the global window object

      console.log(modal);
      this.service.addCategory(this.categoryForm.value).subscribe(
        res => {
          this.serv.flag.next(false);
          if (res.success) {
            Swal.fire('Success', 'Data saved successfully!', 'success');
            this.getAllCategories();
            this.categoryForm.reset();
            modal.hide();
          }
        },
        err => {
          this.serv.flag.next(false);
          // alert(err.error.message);
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
            showConfirmButton: false,
            timer: 3000
          })
        }
      )
    }
    else if (this.status == 'update') {
      console.log(this.categoryForm.value);
     const id:string =this.categoryForm.get('id')?.value;
      this.serv.flag.next(true);
      this.service.updateCategory(id,this.categoryForm.value).subscribe(
        res => {
          this.serv.flag.next(false);
          if (res.success) {
            Swal.fire('Success', 'Data saved successfully!', 'success');
            this.getAllCategories();
            this.categoryForm.reset();
            modal.hide();
            this.status = 'create'; // Reset status to create after update
          }
        },
        err => {
          this.serv.flag.next(false);
          // alert(err.error.message);
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
            showConfirmButton: false,
            timer: 3000
          })
        })
      }

  }

    //delete category
    delete (id: number) {
      this.serv.flag.next(true);
      console.log(id);
      this.service.deleteCategory(id).subscribe(
        res => {
          this.serv.flag.next(false);
          Swal.fire('Success', 'Data deleted successfully!', 'success');
          this.getAllCategories();
        },
        err => {
          this.serv.flag.next(false);
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: 'Oops...',
            text: err.error.message,
            showConfirmButton: false,
            timer: 3000
          })
        }


      )
    }


    //update category
    update(element: Category) {
      this.status = 'update';
      console.log(element);
      this.categoryForm = this.fb.group({
        id: [element.id],
        name: [element.name],
        note: [element.note],
        categoryVAT: [element.categoryVAT],
        isActive: [element.isActive]
      })

      console.log(this.categoryForm.value);
    }
  }
