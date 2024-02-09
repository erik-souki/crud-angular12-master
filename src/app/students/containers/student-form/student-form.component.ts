import { Times } from './../../model/times';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Student } from '../../model/student';
import { StudentsService } from '../../services/students.service';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  form!: FormGroup;

  selectedTeam?: string; // Variable to hold the selected team value

  // Define your form control for the mat-select
  teamControl = new FormControl();


  constructor(private formBuilder: NonNullableFormBuilder,
    private service: StudentsService,
    private snackBar:MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {


      this.teamControl.valueChanges.subscribe(value => {
        this.selectedTeam = value; // Update the selectedTeam variable with the selected value
      });
    //this.form
  }

  ngOnInit(): void {
    const student: Student = this.route.snapshot.data['student'];
    this.form = this.formBuilder.group({
      _id: [student._id],
      name: [student.name,[Validators.required,
         Validators.minLength(3),
         Validators.maxLength(60)]],
      ra:[student.ra,[Validators.required,
         Validators.maxLength(15),
          Validators.pattern("^[0-9]*$")]],
      team:[student.team, [Validators.required]],
      times: this.formBuilder.array(this.retrieveTimes(student))
    });

  }




  private retrieveTimes(student: Student) {
    const times = [];
    if (student?.times){
      student.times.forEach(time => times.push(this.createTime(time)))
    } else {
      times.push(this.createTime());
    }
    return times;
  }

  //aqui é a parte que declara o array de times, como vou mudar e deixar apenas um time adicional, vou deixar um comentario
  getTimesFormsArray() {
    return (<UntypedFormArray> this.form.get('times')).controls;
  }

  private createTime(times: Times = {id:'', teamOne:'', teamTwo:''}) {
    return this.formBuilder.group({
      id: [times.id],
      teamOne: [times.teamOne],
      teamTwo: [times.teamTwo]
    });

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
  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if(field?.hasError('required')){
      return 'Campo obrigatório';
    }
    if(field?.hasError('minlength')){
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] :  3;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }
    if(field?.hasError('maxlength')){
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] :  60;
      return `Tamanho máximo de ${requiredLength} caracteres.`;
    }
    if(field?.hasError('pattern')){
      return `Apenas numeros são permitidos.`;
    }

    return 'Campo Invalido';






  }
}
