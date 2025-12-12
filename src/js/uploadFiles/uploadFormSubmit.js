import configaration from "../config/config.js";
import endTransfer from "./endTransfer.js";
import ToastTemplates from "../templates/ToastTemplates.js";

const displayToast = new ToastTemplates();
const toastSection = document.getElementById("toastSection");
const filesInput = document.getElementById("selectFiles");
const fileUploadform = document.getElementById("fileUploadform");
const shareSection = document.getElementById("shareSection");
const spinner = document.getElementById("spinner");
const qrImage = document.getElementById("qrImage");
const uniCodeArea = document.getElementById("uniCodeArea");
const endTransferBtn = document.getElementById("endTransferBtn");

export async function uploadFiles(event) {
  try {
    event.preventDefault();

    // show Alert if someone want to reload page while a ongoing session
    window.addEventListener("beforeunload", endTransfer);

    const formData = new FormData();

    for (let i = 0; i < filesInput.files.length; i++) {
      formData.append("selectFiles[]", filesInput.files[i]);
    }

    spinner.classList.remove("d-none");

    const res = await fetch(`${configaration.BASE_URL}/upload`, {
      method: "POST",
      headers: {},
      body: formData,
    });

    const data = await res.json();

    spinner.classList.add("d-none");
    shareSection.classList.remove("d-none");
    fileUploadform.classList.add("d-none");

    qrImage.setAttribute("src", data.session.qrPath);
    uniCodeArea.innerHTML = data.session.code;

    endTransferBtn.setAttribute("data-code", data.session.code);
  } catch (err) {
    spinner.classList.add('d-none');
    toastSection.innerHTML = displayToast.errorToast(err.message);

    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 3000);
  }
}
