import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export abstract class ClassesTableData {
  url="http://localhost:3002/classes";

  constructor(private http: HttpClient) {  }
  //abstract dataChange = new Subject<any>();

 getData():Observable<any[0]>{
    return this.http.get(this.url);
  }
 
  addClass(newData):Observable<any[0]>{
    console.log(newData);
    return this.http.post(this.url, newData);
  }

  editClass(newData):Observable<any [0]>{
    console.log(newData);
    let id = newData._id;
    return this.http.put(`${this.url}/${id}`, newData);
  }

  deleteClass(data){
  console.log(data);
    let id = data._id;
    return this.http.delete(`${this.url}/${id}`);
  }
}
  
