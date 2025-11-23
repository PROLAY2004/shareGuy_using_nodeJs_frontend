import configaration from "../config/config.js";

const filesInput = document.getElementById("selectFiles");
const fileUploadform = document.getElementById("fileUploadform");
const shareSection = document.getElementById("shareSection");
const spinner = document.getElementById("spinner");
const qrImage = document.getElementById("qrImage");
const uniCodeArea = document.getElementById("uniCodeArea");

export async function uploadFiles(event) {
  try {
    event.preventDefault();

    // show Alert if someone want to reload page while a ongoing session
    window.addEventListener("beforeunload", function (event) {
      event.preventDefault();
      event.returnValue = "";
    });

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
  } catch (err) {
    console.log(err.message);
  }
}
