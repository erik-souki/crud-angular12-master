import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Student } from '../../model/student';
import { StudentsService } from '../../services/students.service';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

// Replace 'path/to/student.model' with the actual path to the Student model file

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students$: Observable<Student[]> | null = null;// Add the type annotation for the students array


  constructor(
    private studentsService: StudentsService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar:MatSnackBar,
    ) {
      this.refresh();
  }

  refresh() {
    this.students$ = this.studentsService.List()
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

  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route });
  }

  onEdit(student: Student){
    this.router.navigate(['edit',student._id], {relativeTo: this.route });
  }

  onRemove(student: Student) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {

      data: 'Tem certeza que deseja remover esse aluno?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if(result){
        this.studentsService.remove(student._id).subscribe(
      () => {this.refresh();
        this.snackBar.open('Aluno removido com sucesso !!!','X',{duration:3000, verticalPosition: 'top', horizontalPosition: 'center'});},
      () => this.onError('Error ao remover aluno')
    );
      }
    });
  }
}
