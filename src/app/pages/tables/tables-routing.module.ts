import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { SmartTableComponent } from './smart-table/smart-table.component';
import { UsersTableComponent } from './users-table/users-table.component';
import { StudentsTableComponent } from './students-table/students-table.component';
import { TeachersTableComponent } from './teachers-table/teachers-table.component';
import { ClassesTableComponent } from './classes-table/classes-table.component';
import { TreeGridComponent } from './tree-grid/tree-grid.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [
    {
      path: 'smart-table',
      component: SmartTableComponent,
    },
    {
      path: 'users-table',
    component: UsersTableComponent,
    },
    {
      path: 'students-table',
      component: StudentsTableComponent,
    },
    {
      path: 'teachers-table',
      component: TeachersTableComponent,
    },
    {
      path: 'classes-table',
      component: ClassesTableComponent,
    },
    {
      path: 'tree-grid',
      component: TreeGridComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  SmartTableComponent,
  UsersTableComponent,
  StudentsTableComponent,
  TeachersTableComponent,
  ClassesTableComponent,
  TreeGridComponent,
];
