import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvalidFormScrollDirective } from './invalid-form-scroll.directive';
import { FormValidateDirective } from './form-validate.directive';

const directives = [FormValidateDirective, InvalidFormScrollDirective];

@NgModule({
  declarations: directives,
	exports: directives,
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
