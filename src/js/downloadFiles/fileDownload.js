import ToastTemplates from "../templates/ToastTemplates.js";
import configaration from "../config/config.js";

const displayToast = new ToastTemplates();
const toastSection = document.getElementById("toastSection");
const downloadForm = document.getElementById("downloadForm");
const downloadCode = document.getElementById("downloadCode");

downloadForm.addEventListener("submit", downloadFile);

async function downloadFile(e) {
  e.preventDefault();
  try {
    const code = downloadCode.value;

    if (!code) {
      toastSection.innerHTML = displayToast.errorToast(
        "Please Enter Code to Download"
      );
    } else {
      const response = await fetch(
        `${configaration.BASE_URL}/download/${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        toastSection.innerHTML = displayToast.successToast(data.message);
      } else {
        const data = await response.json();

        toastSection.innerHTML = displayToast.errorToast(data.message);
      }
    }
  } catch (err) {
    console.log(err);

    toastSection.innerHTML = displayToast.errorToast(err.message);
  } finally {
    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 3000);
  }
}
