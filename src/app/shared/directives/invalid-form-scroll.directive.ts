import { Directive, ElementRef, HostListener } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';

@Directive({
  selector: '[appInvalidFormScroll]'
})
export class InvalidFormScrollDirective {

  constructor(
    private elementRef: ElementRef,
    private formGroupDirective: FormGroupDirective
  ) { }

	@HostListener('ngSubmit') onSubmit() {
		this.formGroupDirective.control.invalid && this.scrollToFirstInvalidControl();
	}

	private scrollToFirstInvalidControl() {
		const firstInvalidControl: HTMLElement = this.elementRef.nativeElement.querySelector('.ng-invalid');

		window.scroll({
			top: this.getTopOffset(firstInvalidControl),
			left: 0,
			behavior: 'smooth'
		});

		fromEvent(window, 'scroll')
			.pipe(debounceTime(100), take(1))
			.subscribe(() => firstInvalidControl.focus());
	}

	private getTopOffset(controlEl: HTMLElement): number {
		const labelOffset = 50;
		return controlEl.getBoundingClientRect().top + window.screenY - labelOffset;
	}

}
