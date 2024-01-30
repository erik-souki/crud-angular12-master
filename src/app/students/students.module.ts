import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { StudentFormComponent } from './student-form/student-form.component';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students/students.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentsListComponent } from './students-list/students-list.component';


@NgModule({
  declarations: [
    StudentsComponent,
    StudentFormComponent,
    StudentsListComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    AppMaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule

  ]
})
export class StudentsModule { }
