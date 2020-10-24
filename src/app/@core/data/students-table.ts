import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export abstract class StudentsTableData {
  url="http://localhost:3000/students";

  constructor(private http: HttpClient) {  }
  //abstract dataChange = new Subject<any>();

 getData():Observable<any[0]>{
    return this.http.get(this.url);
  }
 
  addStudent(data):Observable<any[0]>{
    return this.http.post(this.url, data);
  }

  editStudent(data):Observable<any [0]>{
    let id = data._id;
    return this.http.put(`${this.url}/${id}`, data);
  }

  deleteStudent(data){
  /*     console.log(data);
 let httpParams= new HttpParams().set('id', data._id);
    let options= {params: httpParams};
    return this.http.delete(this.url, options);*/
    let id = data._id;
    return this.http.delete(`${this.url}/${id}`);
  }
  //<any[]>

}
  
