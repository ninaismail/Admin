import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';


import { TeachersTableData } from 'app/@core/data/teachers-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.scss'],
})
export class TeachersTableComponent{


  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
     // craeteConfirm: true,
      confirmSave: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
     //confirmEdit: true,
     editConfirm: true,
     confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
     // deleteConfirm: true,
     confirmSave: true,
    },
    columns: {
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
      Grade: {
        title: 'Grade',
        type: 'string',
      },     
      Section: {
        title: 'Section',
        type: 'string',
      },
      Subject: {
        title: 'Subject',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: TeachersTableData) {
        this.service.getData().subscribe((res) => {
      this.source.load(res.data);
    });
  }

  onCreateConfirm(event): void {
    const rm = {
     //_id: event.newData._id,
      FirstName: event.newData.FirstName,
      LastName: event.newData.LastName,
      Username: event.newData.Username,
      Email: event.newData.Email,
      Grade: event.newData.Grade,
      Section: event.newData.Section,      
      Subject: event.newData.Subject,
    };
    if (window.confirm('Are you sure you want to add this?')) {
      this.service.addTeacher(rm).subscribe(
        (res) => {
          event.confirm.resolve(event.newData);
          this.service.addTeacher(event.newData);
         this.source.load(event.newData);   
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
      Grade: event.newData.Grade,
      Section: event.newData.Section,
      Subject: event.newData.Subject,
    };
    if (window.confirm('Are you sure you want to edit this ?')) {
    this.service.editTeacher(rm).subscribe(  
        (res) => {             
          event.confirm.resolve(event.newData);
          this.service.editTeacher(event.newData);
          this.source.update(event.data, event.newData);         
          }
      );
     // this.service.dataChange.next();
    } else {
      event.confirm.reject();
    }
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete this?')) {
      this.service.deleteTeacher(event.data).subscribe(
        (res) => {
          event.confirm.resolve(event.data);
          this.service.deleteTeacher(event.data);
          this.source.remove(event.data);       
         }
      );
     // this.service.dataChange.next();
    } else {
      event.confirm.reject();
    }
  } 
 }


