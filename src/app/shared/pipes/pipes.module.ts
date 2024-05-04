import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcerptPipe } from './excerpt.pipe';

const pipes = [
  ExcerptPipe,
];

@NgModule({
  declarations: pipes,
	exports: pipes,
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
