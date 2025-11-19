import PreviewTemplates from "../templates/PreviewTemplates.js";
import ToastTemplates from "../templates/ToastTemplates.js";

const showItems = new PreviewTemplates();
const displayToast = new ToastTemplates();

const rows = document.getElementById("rows");
const filesPreviewSection = document.getElementById("filesPreviewSection");
const toastSection = document.getElementById("toastSection");

export function showPreview(event) {
  const files = event.target.files;
  let count = 0;

  for (let i = 0; i < files.length; i++) {
    const kbSize = (files[i].size / (1024 * 1024)).toFixed(2);
    const fileName = files[i].name;
    const nameList = fileName.split(".");
    const extension = nameList[nameList.length - 1];

    if (files[i].size < 20971520) {
      count += 1;

      if (extension === "pdf") {
        rows.innerHTML += showItems.pdfPreview(fileName, kbSize);
      } else if (extension === "txt") {
        rows.innerHTML += showItems.txtPreview(fileName, kbSize);
      } else if (
        [
          "jpg",
          "jpeg",
          "png",
          "gif",
          "bmp",
          "webp",
          "tiff",
          "tif",
          "svg",
          "raw",
          "cr2",
          "nef",
          "arw",
          "dng",
        ].includes(extension)
      ) {
        rows.innerHTML += showItems.imagePreview(fileName, kbSize);
      } else if (
        ["mp4", "mkv", "avi", "mov", "wmv", "flv", "webm"].includes(extension)
      ) {
        rows.innerHTML += showItems.videoPreview(fileName, kbSize);
      } else if (
        ["zip", "rar", "7z", "tar", "gz", "tgz", "cab"].includes(extension)
      ) {
        rows.innerHTML += showItems.compressedPreview(fileName, kbSize);
      } else {
        rows.innerHTML += showItems.filePreview(fileName, kbSize);
      }
    } else {
      toastSection.innerHTML = displayToast.errorToast(
        `${nameList[0]} is more than 20MB`
      );

      setTimeout(() => {
        toastSection.innerHTML = "";
      }, 3000);
    }
  }

  if (count > 0) {
    filesPreviewSection.classList.remove("d-none");
  }
}
