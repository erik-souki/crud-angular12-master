import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../model/student';
import { Observable } from 'rxjs';
import { delay, first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private readonly API = 'api/student';

  constructor(private httpClient: HttpClient) { }

  List(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.API)
    .pipe(
      first(),
    //  delay(2000),
      tap(students => console.log(students))
    );
  }
}


