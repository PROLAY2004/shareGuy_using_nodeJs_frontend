import configaration from "../config/config.js";

const filesInput = document.getElementById("selectFiles");
const fileUploadform = document.getElementById("fileUploadform");
const shareSection = document.getElementById("shareSection");
const spinner = document.getElementById("spinner");

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

    spinner.classList.add("d-none");
    shareSection.classList.remove("d-none");
    fileUploadform.classList.add("d-none");

    // const data = await res.json();
    console.log(res);
  } catch (err) {
    console.log(err.message);
  }
}
