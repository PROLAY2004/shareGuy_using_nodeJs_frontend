const filesInput = document.getElementById("selectFiles");
const fileUploadform = document.getElementById("fileUploadform");
const shareSection = document.getElementById("shareSection");

export function uploadFiles(event) {
  event.preventDefault();

  shareSection.classList.remove("d-none");
  fileUploadform.classList.add("d-none");

  // show Alert if someone want to reload page while a ongoing session
  window.addEventListener("beforeunload", function (event) {
    event.preventDefault();
  });

  const formData = new FormData();

  console.log("submitting...");

  for (let i = 0; i < filesInput.files.length; i++) {
    console.log(i);
    formData.append("uploadedFile[]", filesInput.files[i]);
  }

  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }
}
