import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentFormComponent } from './containers/student-form/student-form.component';
import { StudentsComponent } from './containers/students/students.component';
import { StudentResolver } from './guards/student.resolver';

const routes: Routes = [
  {path: '', component : StudentsComponent},
  {path: 'new', component : StudentFormComponent, resolve: {student: StudentResolver}},
  {path: 'edit/:id', component : StudentFormComponent, resolve: {student: StudentResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
