import { Routes } from '@angular/router';
import { LoginComponent } from './auth/Components/login/login.component';
import { RegisterComponent } from './auth/Components/register/register.component';
import { AlldrugComponent } from './dashboard/drugs/alldrug/alldrug.component';
import { authGuard } from './auth.guard';
import { LayoutComponent } from './dashboard/layout/layout.component';

export const routes: Routes = [

  {path:'auth',loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
   { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
   {path:'drugs',canActivate:[authGuard], component:AlldrugComponent},
  {path: 'dashboard',canActivate:[authGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }

];
