import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from '@shared/pipes/pipes.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableUsersComponent } from './table-users/table-users.component';
import { ComponentsModule } from '@shared/components/components.module';

const tables = [
  TableUsersComponent,
]

@NgModule({
  declarations: tables,
  imports: [
    CommonModule,
    PipesModule,
    MatPaginatorModule,
    MatButtonModule,
    MatTooltipModule,
    ComponentsModule
  ],
  exports: tables,
})
export class TablesModule { }
