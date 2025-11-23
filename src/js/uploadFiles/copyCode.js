const copyCodeBtn = document.getElementById("copyCodeBtn");
const uniCodeArea = document.getElementById("uniCodeArea");

copyCodeBtn.addEventListener("click", copyCode);

function copyCode() {
  const code = uniCodeArea.innerHTML;

  navigator.clipboard
    .writeText(code)
    .then(() => {
      alert("Coppied");
    })
    .catch((err) => {
      console.error("Failed to copy: ", err);
    });
}
