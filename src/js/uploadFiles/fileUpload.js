import { showPreview } from "./filePreview.js";

const filesInput = document.getElementById("selectFiles");
const fileUploadform = document.getElementById("fileUploadform");
const shareSection = document.getElementById("shareSection");

filesInput.addEventListener("change", showPreview);
fileUploadform.addEventListener("submit", uploadFiles);

function uploadFiles(event) {
  event.preventDefault();

  const formData = new FormData();

  for (let i = 0; i < filesInput.files.length; i++) {
    console.log(i);
    formData.append("uploadedFile[]", filesInput.files[i]);
  }

  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  shareSection.classList.remove("d-none");
  fileUploadform.classList.add("d-none");
}
