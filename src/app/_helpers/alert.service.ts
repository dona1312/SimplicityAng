import swal from 'sweetalert2';

export class AlertService {
	
	public static showConfirmationModal(title: string, text: string, callbackFunction: any) {
		// swal({
		// 	title: title,
		// 	text: text,
		// 	type: 'question',
		// 	showCancelButton: true,
		// 	focusCancel: true,
		// 	preConfirm: callbackFunction
		// });
	}

	public static showSuccessModal(text: string) {
		// swal({
		// 	title: 'Success',
		// 	text: text,
		// 	type: 'success',
		// 	toast: true,
		// 	timer: 3000,
		// 	position: 'top-right'
		// });

	}

	public static showErrorModal(text: string) {
		// swal({
		// 	title: 'Error',
		// 	text: text,
		// 	type: 'error',
		// 	toast: true,
		// 	timer: 3000,
		// 	position: 'top-right'
		// });

	}
}
