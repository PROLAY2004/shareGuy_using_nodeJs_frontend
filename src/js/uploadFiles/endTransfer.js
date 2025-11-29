import configaration from "../config/config.js";
import ToastTemplates from "../templates/ToastTemplates.js";

const displayToast = new ToastTemplates();
const endTransferBtn = document.getElementById("endTransferBtn");
const toastSection = document.getElementById("toastSection");

export default async function endTransfer() {
  try {
    const code = endTransferBtn.getAttribute("data-code");

    const response = await fetch(
      `${configaration.BASE_URL}/upload/end/${code}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!data.success) {
      toastSection.innerHTML = displayToast.errorToast(data.message);
    }
  } catch (err) {
    toastSection.innerHTML = displayToast.errorToast(err.message);
  } finally {
    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 3000);
  }
}
