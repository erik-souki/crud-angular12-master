import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { StudentsService } from '../services/students.service';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: [''],
    ra:[],
    team:['']
  });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: StudentsService,
    private snackBar:MatSnackBar,
    private location: Location) {
    //this.form
  }

  ngOnInit(): void {

  }

  onSubmit(){
      this.service.save(this.form.value)
      .subscribe(result =>  this.onSuccess(), error => this.onError());
      }



  onCancel(){
    this.location.back();

  }
  private onSuccess( ){
    this.snackBar.open('Aluno salvo com sucesso !!!','',{duration:3000});
    this.onCancel();
  }

  private onError( ) {
    this.snackBar.open('Erro ao salvar aluno','',{duration:3000});
  }
}
