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
 
  addStudent(newData):Observable<any[0]>{
    console.log(newData);
    return this.http.post(this.url, newData);
  }

  editStudent(newData):Observable<any [0]>{
    console.log(newData);
    /*let httpParams= new HttpParams().set('id', newData._id);
    let options= {params: httpParams};*/
    let id = newData._id;
    return this.http.put(`${this.url}/${id}`, newData);
  }

  deleteStudent(data){
  console.log(data);
 /*let httpParams= new HttpParams().set('id', data._id);
    let options= {params: httpParams};
    return this.http.delete(this.url, options);;*/
    let id = data._id;
    return this.http.delete(`${this.url}/${id}`);
  }
  //<any[]>sss
}
  
