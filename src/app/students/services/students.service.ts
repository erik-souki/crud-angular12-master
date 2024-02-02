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

  loadById(id: string){
    return this.httpClient.get<Student>(`${this.API}/${id}`);
  }

  save(record: Partial<Student>) {
    //console.log(record)
    if(record._id){
     // console.log('update');
      return this.update(record);
    }
    //console.log('create');
    return this.create(record);
  }

  private create(record: Partial<Student>) {
    return this.httpClient.post<Student>(this.API, record).pipe(first());
  }

  private update(record: Partial<Student>) {
    return this.httpClient.put<Student>(`${this.API}/${record._id}`, record).pipe(first());
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }

}


