import QRCode from 'qrcode';

import ToastTemplates from '../templates/ToastTemplates.js';

const displayToast = new ToastTemplates();
const downloadQR = document.getElementById('downloadQR');
const toastSection = document.getElementById('toastSection');

export default async function hostSocket() {
	try {
		const publicCode = localStorage.getItem('socketId');
		const qrUrl = await QRCode.toDataURL(publicCode);

		downloadQR.src = qrUrl;
	} catch (err) {
		toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		setTimeout(() => {
			toastSection.innerHTML = '';
		}, 3000);
	}
}
