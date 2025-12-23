import QRCode from 'qrcode';

import configaration from '../config/config.js';
import endTransfer from './endTransfer.js';
import ToastTemplates from '../templates/ToastTemplates.js';

const displayToast = new ToastTemplates();
const toastSection = document.getElementById('toastSection');
const filesInput = document.getElementById('selectFiles');
const fileUploadform = document.getElementById('fileUploadform');
const shareSection = document.getElementById('shareSection');
const spinner = document.getElementById('spinner');
const qrImage = document.getElementById('qrImage');
const uniCodeArea = document.getElementById('uniCodeArea');
const endTransferBtn = document.getElementById('endTransferBtn');

let beforeUnloadAttached = false;

export async function uploadFiles(event) {
	try {
		event.preventDefault();

		if (!beforeUnloadAttached) {
			// show Alert if someone want to reload page while a ongoing session
			window.addEventListener('beforeunload', endTransfer);
			beforeUnloadAttached = true;
		}

		const formData = new FormData();

		for (let i = 0; i < filesInput.files.length; i++) {
			formData.append('selectFiles[]', filesInput.files[i]);
		}

		spinner.classList.remove('d-none');

		const res = await fetch(`${configaration.BASE_URL}/upload`, {
			method: 'POST',
			body: formData,
		});

		const data = await res.json();

		if (data.success) {
			spinner.classList.add('d-none');
			shareSection.classList.remove('d-none');
			fileUploadform.classList.add('d-none');

			qrImage.src = await QRCode.toDataURL(
				`${configaration.BASE_URL}/download/${data.data.code}`
			);
			uniCodeArea.innerHTML = data.data.code;

			endTransferBtn.setAttribute('data-code', data.data.code);
		} else {
			spinner.classList.add('d-none');
			toastSection.innerHTML = displayToast.errorToast(data.message);
		}
	} catch (err) {
		spinner.classList.add('d-none');
		toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		setTimeout(() => {
			toastSection.innerHTML = '';
		}, 3000);
	}
}
