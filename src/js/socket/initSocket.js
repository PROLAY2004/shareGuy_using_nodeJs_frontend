import { io } from 'socket.io-client';

import configaration from '../config/config.js';
import { downloadFile } from '../downloadFiles/fileDownload.js';

export default async function initSocket() {
	const socket = io(configaration.BASE_URL);
	const sendFileBtn = document.getElementById('sendFileBtn');

	socket.on('connect', () => {
		localStorage.setItem('socketId', socket.id);

		sendFileBtn.addEventListener('click', () => {
			const roomId = sendFileBtn.getAttribute('data-socketId');
			const shareCodeId = sendFileBtn.getAttribute('data-shareCode');

			socket.emit('send-file', { roomId, shareCodeId });
		});

		socket.on('receive-file', (shareCodeId) => {
			downloadFile(shareCodeId);
		});
	});
}
