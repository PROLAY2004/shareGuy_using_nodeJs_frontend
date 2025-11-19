const dropZone = document.getElementById("dropZone");

// Prevent the browser's default handling of dragged items
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

dropZone.addEventListener("drop", dropHandler);

function dropHandler() {
  console.log("File dropped");
}
