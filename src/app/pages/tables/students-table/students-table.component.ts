import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';


import { StudentsTableData } from 'app/@core/data/students-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.scss'],
})
export class StudentsTableComponent{


  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      _id: {
        title: 'ID',
        type: 'number',
      },
      FirstName: {
        title: 'First Name',
        type: 'string',
      },
      LastName: {
        title: 'Last Name',
        type: 'string',
      },
      Username: {
        title: 'Username',
        type: 'string',
      },
      Email: {
        title: 'Email',
        type: 'string',
      },     
      Class: {
        title: 'Class',
        type: 'string',
      },
      Age: {
        title: 'Age',
        type: 'number',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: StudentsTableData) {
        this.service.getData().subscribe((res) => {
      this.source.load(res.data);
    });
  }

  onCreateConfirm(event): void {
    const rm = {
      _id: event.data._id,
      FirstName: event.data.FirstName,
      LastName: event.data.LastName,
      Username: event.data.Username,
      Email: event.data.Email,
      Class: event.data.Class,
      Age: event.data.Age,
    };
    if (window.confirm('Are you sure you want to delete this Rainmaker?')) {
      this.service.addStudent(rm).subscribe(
        (res) => {
          event.confirm.resolve(event.rm);
          this.service.addStudent(event.rm);
          this.source.load(event.rm);   
        }
      );
     // this.service.dataChange.next();event.newData
      } else {
      event.confirm.reject();
    }
  }

  onUpdateConfirm(event): void {
    const rm = {
      _id: event.newData._id,
      FirstName: event.newData.FirstName,
      LastName: event.newData.LastName,
      Username: event.newData.Username,
      Email: event.newData.Email,
      Class: event.newData.Class,
      Age: event.newData.Age,
    };
    if (window.confirm('Are you sure you want to delete this Rainmaker?')) {
  this.service.editStudent(rm).subscribe(  
        (res) => {             
          event.confirm.resolve(event.rm);
          this.service.editStudent(event.rm);
          this.source.update(event.data, event.rm);         
          }
      );
     // this.service.dataChange.next();
          // this.service.dataChange.next();
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete this Rainmaker?')) {
      this.service.deleteStudent(event.data).subscribe(
        (res) => {
          event.confirm.resolve(event.data);
          this.service.deleteStudent(event.data);
          this.source.remove(event.data);       
         }
      );
     // this.service.dataChange.next();
    } else {
      event.confirm.reject();
    }
  } 
 }


/*  onCreateConfirm(event) {
    event.confirm.resolve();
    this.service.addStudent(event.newData);
    this.source.add(event.newData);
    //this.change.emit();
  }

  onDeleteConfirm(event) {
    if (window.confirm("Are you sure you want to delete a Rainmaker??!?!")) {
      event.confirm.resolve();
      this.source.remove(event.data);
      this.service.deleteStudent(event.data);
    } else {
      event.confirm.reject();
    }
  }
 } 
  this.service.getData().subscribe(
      (res) => {
        this.source.load(res.data);
      }
    );
 onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      //call event.newData to remote api, remember that you have to await this
      event.confirm.resolve();
      this.service.addStudent(event.student).subscribe(
        (res) => {
          this.source.load(res);
        },
        (err) => {
          alert('error');
        }
      );

    } else {
      event.confirm.reject();
    }
  }    
  onEditConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      //call to remote api, remember that you have to await this
      event.confirm.resolve();      
      this.service.editStudent(event.newData).subscribe(
        (res) => {
          this.source.load(res);
        },
        (err) => {
          alert('error');
        }
     );      
    
    } else {
      event.confirm.reject();
    }
  }    
  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();      
      this.service.deleteStudent(event.data).subscribe(
        (res) => {
          this.source.load(res);
        },
        (err) => {
          alert('error');
        }
      );
    } else {
      event.confirm.reject();
    }
  }*/

