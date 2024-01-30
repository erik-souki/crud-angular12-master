import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../model/student';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  @Input() students: Student[] = [];
  readonly displayedColumns = ['_id','name','ra','team','actions'];

  constructor(  private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.route })}

}
