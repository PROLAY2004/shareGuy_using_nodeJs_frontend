import { showPreview } from "./filePreview.js";
import { uploadFiles } from "./uploadFormSubmit.js";

const filesInput = document.getElementById("selectFiles");
const fileUploadform = document.getElementById("fileUploadform");

// file uploaded from input field and show preview
filesInput.addEventListener("change", (event) => {
  const files = event.target.files;
  showPreview(files);
});

// file submission
fileUploadform.addEventListener("submit", uploadFiles);
