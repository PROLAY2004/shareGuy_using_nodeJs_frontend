import QRCode from 'qrcode';

import ToastTemplates from '../templates/ToastTemplates.js';
import configaration from '../config/config.js';

const downloadQR = document.getElementById('downloadQR');
const displayToast = new ToastTemplates();
const toastSection = document.getElementById('toastSection');

export default async function hostSocket() {
	try {
		const response = await fetch(`${configaration.BASE_URL}/connect/host`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const { publicCode, privateCode } = await response.json();
		const qrUrl = await QRCode.toDataURL(publicCode);

		downloadQR.src = qrUrl;

		const ws = new WebSocket(
			`ws://${configaration.WS_URL}/?mode=host&public=${publicCode}&private=${privateCode}`
		);

		ws.onmessage = (msg) => {
			console.log('Data from client:', msg.data);
		};

		ws.onopen = () => console.log('Host WebSocket Connected');
	} catch (err) {
		toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		setTimeout(() => {
			toastSection.innerHTML = '';
		}, 3000);
	}
}
