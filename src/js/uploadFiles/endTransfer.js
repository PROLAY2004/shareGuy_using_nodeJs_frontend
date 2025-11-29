import configaration from "../config/config.js";
import ToastTemplates from "../templates/ToastTemplates.js";

const displayToast = new ToastTemplates();
const endTransferBtn = document.getElementById("endTransferBtn");
const toastSection = document.getElementById("toastSection");

endTransferBtn.addEventListener("click", () => {
  window.location.reload();
});

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
    } else {
      window.location.reload();
    }
  } catch (err) {
    toastSection.innerHTML = displayToast.errorToast(err.message);
  } finally {
    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 3000);
  }
}
