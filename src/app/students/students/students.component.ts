import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Student } from '../model/student';
import { StudentsService } from '../services/students.service';

// Replace 'path/to/student.model' with the actual path to the Student model file

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students$: Observable<Student[]>;// Add the type annotation for the students array
  displayedColumns = ['_id','name','ra'];

  constructor(
    private StudentsService: StudentsService,
    public dialog: MatDialog
    ) {

    this.students$ = this.StudentsService.List()
    .pipe(
      catchError(error => {
       this.onError('Erro ao carregar alunos.')
       return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }


  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
 //   this.students = [
  //    {_id:'2', name: 'Alice', ra: '12345' },
    //  { _id:'3', name: 'Bob', ra: '54321' }
    //];
  }

}
