import { validateBr } from 'js-brasil';
import { AbstractControl } from '@angular/forms';

export class DocumentValidator {
	static cpf(control: AbstractControl) {
		const { value } = control;
		if (value) {
			if (!validateBr['cpf'](value)) {
				return {
					cpf: true
				};
			}
		}
		return null;
	}

	static cnpj(control: AbstractControl) {
		const { value } = control;
		if (value) {
			if (!validateBr['cnpj'](value)) {
				return {
					cnpj: true
				};
			}
		}
		return null;
	}

	static cpfCnpj(control: AbstractControl) {
		const { value } = control;
		if (value) {
			if (!validateBr['cnpj'](value) && !validateBr['cpf'](value)) {
				return {
					cpfCnpj: true
				};
			}
		}
		return null;
	}
}
