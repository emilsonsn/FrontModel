import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '@shared/components/components.module';
import { PipesModule } from '@shared/pipes/pipes.module';
import { DirectivesModule } from '@shared/directives/directives.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import {ClipboardModule} from '@angular/cdk/clipboard';



@NgModule({
  declarations: [
    DialogUserComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    DirectivesModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgxMatSelectSearchModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDividerModule,
    ClipboardModule
  ]
})
export class DialogsModule { }
