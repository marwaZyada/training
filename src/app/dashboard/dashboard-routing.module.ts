import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';import { CommonModule } from '@angular/common';
import { AlldrugComponent } from './drugs/alldrug/alldrug.component';
import { CategoryComponent } from './clinic-categoriy/category/category.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from '../auth.guard';


const routes: Routes = [
  // {path: '', redirectTo: 'layout', pathMatch: 'full'},
  {path: '',canActivate:[authGuard], component:LayoutComponent, children: [
 { path: '', component:AlldrugComponent  },
  { path:'category', component:CategoryComponent }
  ]},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
