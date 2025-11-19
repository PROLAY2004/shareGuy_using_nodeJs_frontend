import { showPreview } from "./filePreview.js";

const dropZone = document.getElementById("dropZone");
const filesInput = document.getElementById("selectFiles");

// Prevent the browser's default handling of dragged items
dropZone.addEventListener("dragenter", preventDefaults);
dropZone.addEventListener("dragover", preventDefaults);
dropZone.addEventListener("dragleave", preventDefaults);
dropZone.addEventListener("drop", preventDefaults);

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// add style when item hover
dropZone.addEventListener("dragenter", addHighlight);
dropZone.addEventListener("dragover", addHighlight);
dropZone.addEventListener("dragleave", removeHignlight);
dropZone.addEventListener("drop", removeHignlight);

function addHighlight() {
  dropZone.classList.add("highlight");
}

function removeHignlight() {
  dropZone.classList.remove("highlight");
}

// handle after file drop
dropZone.addEventListener("drop", dropHandler);

function dropHandler(e) {
  const dt = new DataTransfer();
  const droppedFiles = e.dataTransfer.files;

  for (let i = 0; i < droppedFiles.length; i++) {
    dt.items.add(droppedFiles[i]);
  }

  filesInput.files = dt.files;
  showPreview(droppedFiles);
}
