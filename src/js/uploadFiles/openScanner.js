import jsQR from 'jsqr';
import * as bootstrap from 'bootstrap';

import ToastTemplates from '../templates/ToastTemplates.js';

const displayToast = new ToastTemplates();

const toastSection = document.getElementById('toastSection');
const restartScanner = document.getElementById('restartScanner');
const openScannerBtn = document.getElementById('openScannerBtn');
const scannerModal = document.getElementById('scannerModal');
const scannerStatus = document.getElementById('scannerStatus');
const scannerOverlay = document.getElementById('scannerOverlay');
const scannerVideo = document.getElementById('scannerVideo');
const sendFileBtn = document.getElementById('sendFileBtn');
const uniCodeArea = document.getElementById('uniCodeArea');

const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const SCAN_INTERVAL = 120;

let scanning;

const openScannerModal = new bootstrap.Modal(scannerModal);

openScannerBtn.addEventListener('click', initScanner);
restartScanner.addEventListener('click', initScanner);

async function initScanner() {
	restartScanner.classList.add('d-none');

	openScannerModal.show();
	scanning = true;

	try {
		scannerStatus.textContent = 'Accessing camera...';

		// Request camera access
		const stream = await navigator.mediaDevices.getUserMedia({
			video: {
				facingMode: 'environment',
				width: { ideal: 1280 },
				height: { ideal: 1280 },
			},
		});

		// Show video stream
		scannerVideo.srcObject = stream;
		await scannerVideo.play();

		// Update UI
		scannerOverlay.classList.add('d-none');
		scannerStatus.innerHTML = 'Point your camera at a QR code to scan';

		scanQrData();
	} catch (error) {
		console.error('Error accessing camera:', error);
		scannerStatus.textContent =
			'Unable to access camera. Please check permissions.';
	}
}

async function scanQrData() {
	try {
		if (!scanning) return;

		if (scannerVideo.readyState !== scannerVideo.HAVE_ENOUGH_DATA) {
			return setTimeout(scanQrData, SCAN_INTERVAL);
		}

		const scale = 0.5;
		canvas.width = scannerVideo.videoWidth * scale;
		canvas.height = scannerVideo.videoHeight * scale;

		ctx.drawImage(scannerVideo, 0, 0, canvas.width, canvas.height);

		const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

		const code = jsQR(imageData.data, imageData.width, imageData.height, {
			inversionAttempts: 'dontInvert',
		});

		if (code) {
			scanning = false;

			sendFileBtn.setAttribute('data-socketId', code.data);
			sendFileBtn.setAttribute('data-shareCode', uniCodeArea.innerText);

			scannerVideo.srcObject?.getTracks().forEach((track) => track.stop());

			scannerStatus.innerHTML = 'QR Code detected ✔';
			restartScanner.classList.remove('d-none');
			sendFileBtn.removeAttribute('disabled');

			return;
		}

		setTimeout(scanQrData, SCAN_INTERVAL);
	} catch (err) {
		toastSection.innerHTML = displayToast.errorToast(err.message);
		openScannerModal.hide();
	}
}

// remove camera access when modal close
scannerModal.addEventListener('hidden.bs.modal', () => {
	scanning = false;
	scannerVideo.srcObject?.getTracks().forEach((track) => track.stop());
});
