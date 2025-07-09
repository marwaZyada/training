import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { GateInterceptor } from '../gate.interceptor';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ], 
  // providers: [
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useClass: GateInterceptor,
  //     multi: true
  //   }
  // ]
})
export class DashboardModule { }
