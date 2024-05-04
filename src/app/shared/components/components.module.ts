import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { HeaderComponent } from './header/header.component';
import { MatDividerModule } from '@angular/material/divider';
import { PipesModule } from '@shared/pipes/pipes.module';
import { MatButtonModule } from '@angular/material/button';

const components = [
  LoaderComponent,
  HeaderComponent,
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    PipesModule,
    MatDividerModule,
    MatButtonModule
  ],
  exports: components
})
export class ComponentsModule { }
