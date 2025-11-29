import * as bootstrap from "bootstrap";
import ToastTemplates from "../templates/ToastTemplates.js";

const displayToast = new ToastTemplates();
const toastSection = document.getElementById("toastSection");
const copyCodeBtn = document.getElementById("copyCodeBtn");
const uniCodeArea = document.getElementById("uniCodeArea");
const copyCodeModal = document.getElementById("copyCodeModal");

const alertModal = new bootstrap.Modal(copyCodeModal);

copyCodeBtn.addEventListener("click", copyCode);

function copyCode() {
  const code = uniCodeArea.innerHTML;

  navigator.clipboard
    .writeText(code)
    .then(() => {
      alertModal.show();
    })
    .catch((err) => {
      toastSection.innerHTML = displayToast.errorToast(err.message);

      setTimeout(() => {
        toastSection.innerHTML = "";
      }, 3000);
    });
}
