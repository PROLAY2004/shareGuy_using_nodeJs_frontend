import { io } from 'socket.io-client';
import * as bootstrap from 'bootstrap';

import configaration from '../config/config.js';
import { downloadFile } from '../downloadFiles/fileDownload.js';
import ToastTemplates from '../templates/ToastTemplates.js';

export default async function initSocket() {
	const scannerModal = document.getElementById('scannerModal');
	const socket = io(configaration.BASE_URL);
	const sendFileBtn = document.getElementById('sendFileBtn');
	const toastSection = document.getElementById('toastSection');

	const displayToast = new ToastTemplates();
	const openScannerModal =
		bootstrap.Modal.getInstance(scannerModal) ||
		new bootstrap.Modal(scannerModal);

	socket.on('connect', () => {
		localStorage.setItem('socketId', socket.id);

		sendFileBtn.addEventListener('click', () => {
			const roomId = sendFileBtn.getAttribute('data-socketId');
			const shareCodeId = sendFileBtn.getAttribute('data-shareCode');

			socket.emit('send-file', { roomId, shareCodeId });

			sendFileBtn.setAttribute('Disabled', '');
			openScannerModal.hide();

			toastSection.innerHTML = displayToast.successToast(
				'File Sent Successfully'
			);

			setTimeout(() => {
				toastSection.innerHTML = '';
			}, 3000);
		});

		socket.on('receive-file', (shareCodeId) => {
			downloadFile(shareCodeId);
		});
	});
}
