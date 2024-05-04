import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './layout-private/sidebar/sidebar.component';
import { HeaderComponent } from './layout-private/header/header.component';
import { LayoutPrivateComponent } from './layout-private/layout-private.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    SidebarComponent,
    HeaderComponent,
    LayoutPrivateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    MatBadgeModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  exports: [
    LayoutPrivateComponent
  ]
})
export class LayoutsModule { }
