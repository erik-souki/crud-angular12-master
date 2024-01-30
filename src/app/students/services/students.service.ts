import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

import { Student } from '../model/student';

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

  save(record: Partial<Student>) {
    return this.httpClient.post<Student>(this.API, record).pipe(first());
  }
}


