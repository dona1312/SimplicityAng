import {FormGroup} from '@angular/forms';

export class FormUtil {

	public static getTouchedData(formGroup: FormGroup): any {
		const data = {};

		for (const key in formGroup.controls) {
			if (formGroup.controls.hasOwnProperty(key)) {
				const control = formGroup.controls[key];
				if (control.touched) {
					data[key] = control.value;
				}
			}
		}

		return data;
	}

	public static prepareData(formGroup: FormGroup, skipId?: boolean): any {
		const data = this.getTouchedData(formGroup);

		if (!skipId) {
			data.id = formGroup.value.id;
		}

		return data;
	}
}
