import * as bootstrap from 'bootstrap';

const openScannerBtn = document.getElementById('openScannerBtn');
const scannerModal = document.getElementById('scannerModal');
const scannerStatus = document.getElementById('scannerStatus');
const scannerOverlay = document.getElementById('scannerOverlay');

const openScannerModal = new bootstrap.Modal(scannerModal);

openScannerBtn.addEventListener('click', initScanner);

async function initScanner() {
	openScannerModal.show();

	try {
		scannerStatus.textContent = 'Accessing camera...';

		// Request camera access
		const stream = await navigator.mediaDevices.getUserMedia({
			video: {
				width: { ideal: 1280 },
				height: { ideal: 720 },
			},
		});

		// Show video stream
		scannerVideo.srcObject = stream;
		await scannerVideo.play();

		// Update UI
		scannerOverlay.classList.add('d-none');
		scannerStatus.innerHTML = 'Point your camera at a QR code to scan';
	} catch (error) {
		console.error('Error accessing camera:', error);
		scannerStatus.textContent =
			'Unable to access camera. Please check permissions.';
	}
}
