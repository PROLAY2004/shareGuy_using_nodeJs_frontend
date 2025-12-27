import ToastTemplates from "../templates/ToastTemplates.js";
import configaration from "../config/config.js";

const displayToast = new ToastTemplates();
const toastSection = document.getElementById("toastSection");
const downloadForm = document.getElementById("downloadForm");
const downloadCode = document.getElementById("downloadCode");
const spinner = document.getElementById("spinner");

downloadForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	downloadFile(downloadCode.value);
});

downloadCode.addEventListener('input', () => {
	downloadCode.classList.remove('border-danger');
});

export async function downloadFile(code) {
	try {
		if (!code) {
			downloadCode.classList.add('border-danger');
			toastSection.innerHTML = displayToast.errorToast(
				'Please Enter Code to Download'
			);
		} else {
			spinner.classList.remove('d-none');

			const response = await fetch(
				`${configaration.BASE_URL}/download/${code.toUpperCase()}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (response.ok) {
				spinner.classList.add('d-none');

				const url = `${configaration.BASE_URL}/download/${code}`;
				window.open(url, '_blank');

				toastSection.innerHTML = displayToast.successToast(
					'Your download has started'
				);
			} else {
				const data = await response.json();

				spinner.classList.add('d-none');
				downloadCode.classList.add('border-danger');

				toastSection.innerHTML = displayToast.errorToast(data.message);
			}
		}
	} catch (err) {
		toastSection.innerHTML = displayToast.errorToast(err.message);
	} finally {
		setTimeout(() => {
			toastSection.innerHTML = '';
		}, 3000);
	}
}
