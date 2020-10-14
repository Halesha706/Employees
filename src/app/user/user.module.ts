import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees-add/employees.component';
import { GoogleMapComponent } from './google-map/google-map.component';
import { UserComponent } from './user.component';
import { AgmCoreModule } from '@agm/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeListComponent } from './employee-list/employee-list.component';

const routes: Routes = [
  {
    path: 'add-employee',
    component: EmployeesComponent,
  },
  {
    path: 'add-employee/:id',
    component: EmployeesComponent,
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
  },
];

@NgModule({
  declarations: [
    EmployeesComponent,
    GoogleMapComponent,
    UserComponent,
    EmployeeListComponent,
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'Add Your Api key for google map',
      libraries: ['places'],
    }),
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule { }
