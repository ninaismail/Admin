import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';


import { UsersTableData } from 'app/@core/data/users-table';

@Component({
  selector: 'ngx-smart-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent{


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
      Username: {
        title: 'Username',
        type: 'string',
      },
      Password: {
        title: 'Password',
        type: 'string',
      },     
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: UsersTableData) {
        this.service.getData().subscribe((res) => {
      this.source.load(res.data);
    });
  }

  onCreateConfirm(event): void {
    const rm = {
     //_id: event.newData._id,
      Username: event.newData.Username,
      Password: event.newData.Password,
    };
    if (window.confirm('Are you sure you want to add this?')) {
      this.service.addUser(rm).subscribe(
        (res) => {
          event.confirm.resolve(event.newData);
          this.service.addUser(event.newData);
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
     Username: event.newData.Username,
     Password: event.newData.Password,
    };
    if (window.confirm('Are you sure you want to edit this ?')) {
    this.service.editUser(rm).subscribe(  
        (res) => {             
          event.confirm.resolve(event.newData);
          this.service.editUser(event.newData);
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
      this.service.deleteUser(event.data).subscribe(
        (res) => {
          event.confirm.resolve(event.data);
          this.service.deleteUser(event.data);
          this.source.remove(event.data);       
         }
      );
     // this.service.dataChange.next();
    } else {
      event.confirm.reject();
    }
  } 
 }


