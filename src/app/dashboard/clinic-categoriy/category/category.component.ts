import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from './service/category.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProgressComponent } from "../../../shared/Components/progress/progress.component";
import { Category } from './interface/category.model';
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
  constructor(private service: CategoryService, private fb: FormBuilder) {

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
      this.service.flag.next(true);
      // Access Bootstrap Modal from the global window object

      console.log(modal);
      this.service.addCategory(this.categoryForm.value).subscribe(
        res => {
          this.service.flag.next(false);
          if (res.success) {
            Swal.fire('Success', 'Data saved successfully!', 'success');
            this.getAllCategories();
            this.categoryForm.reset();
            modal.hide();
          }
        },
        err => {
          this.service.flag.next(false);
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
      this.service.flag.next(true);
      this.service.updateCategory(id,this.categoryForm.value).subscribe(
        res => {
          this.service.flag.next(false);
          if (res.success) {
            Swal.fire('Success', 'Data saved successfully!', 'success');
            this.getAllCategories();
            this.categoryForm.reset();
            modal.hide();
            this.status = 'create'; // Reset status to create after update
          }
        },
        err => {
          this.service.flag.next(false);
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
      this.service.flag.next(true);
      console.log(id);
      this.service.deleteCategory(id).subscribe(
        res => {
          this.service.flag.next(false);
          Swal.fire('Success', 'Data deleted successfully!', 'success');
          this.getAllCategories();
        },
        err => {
          this.service.flag.next(false);
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
        name: [element.name, [Validators.required]],
        note: [element.note, [Validators.required]],
        categoryVAT: [element.categoryVAT, [Validators.required]],
        isActive: [element.isActive]
      })

      console.log(this.categoryForm.value);
    }
  }
