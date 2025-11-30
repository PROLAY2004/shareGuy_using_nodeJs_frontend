import ToastTemplates from "../templates/ToastTemplates.js";
import configaration from '../config/config.js';

const displayToast = new ToastTemplates();
const toastSection = document.getElementById('toastSection');
const emailFileForm = document.getElementById('emailFileForm');
const reciverEmail = document.getElementById('reciverEmail');
const endTransferBtn = document.getElementById('endTransferBtn');
const spinner = document.getElementById('spinner');

emailFileForm.addEventListener('submit', sendFileViaEMail);
reciverEmail.addEventListener('input', () => {
	reciverEmail.classList.remove('border-danger');
});

async function sendFileViaEMail(event) {
	try {
		event.preventDefault();

		const email = reciverEmail.value;
		const code = endTransferBtn.getAttribute('data-code');

		spinner.classList.remove('d-none');

		const response = await fetch(
			`${configaration.BASE_URL}/download/send-email`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					code,
				}),
			}
		);

		const data = await response.json();
		spinner.classList.add('d-none');

		if (data.success) {
			toastSection.innerHTML = displayToast.successToast(data.message);
		} else {
			reciverEmail.classList.add('border-danger');

			toastSection.innerHTML = displayToast.errorToast(data.message);
		}
	} catch (err) {
		reciverEmail.classList.add('border-danger');

		toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		setTimeout(() => {
			toastSection.innerHTML = '';
		}, 3000);
	}
}
