import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[formGroup]'
})
export class FormValidateDirective {
	@Input()
	formGroup: FormGroup;

	@Output()
	validSubmit = new EventEmitter<FormGroup>();

	@HostListener('submit')
	onSubmit() {
		if (this.formGroup.valid) {
			this.validSubmit.emit(this.formGroup.getRawValue());
			return;
		}
		this.markAsTouchedAndDirty(this.formGroup);
	}

	markAsTouchedAndDirty(control: AbstractControl) {
		if (control instanceof FormGroup) {
			Object.keys(control.controls).forEach(key => this.markAsTouchedAndDirty(control.controls[key]));
		} else if (control instanceof FormArray) {
			control.controls.forEach(c => this.markAsTouchedAndDirty(c));
		} else if (control instanceof FormControl && control.enabled) {
			control.markAsDirty();
			control.markAsTouched();
			control.updateValueAndValidity();
		}
	}

}
