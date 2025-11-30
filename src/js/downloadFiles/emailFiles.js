import ToastTemplates from "../templates/ToastTemplates.js";
// import configaration from "../config/config.js";

const displayToast = new ToastTemplates();
const toastSection = document.getElementById("toastSection");
const emailFileForm = document.getElementById("emailFileForm");
const reciverEmail = document.getElementById("reciverEmail");

emailFileForm.addEventListener("submit", sendFileViaEMail);
emailFileForm.addEventListener("input", () => {
  reciverEmail.classList.remove("border-danger");
});

async function sendFileViaEMail(event) {
  try {
    event.preventDefault();

    const email = reciverEmail.value;

    if (!email) {
      reciverEmail.classList.add("border-danger");

      toastSection.innerHTML = displayToast.errorToast("Please Enter a Email");
    } else if (!isValidEmail(email)) {
      reciverEmail.classList.add("border-danger");

      toastSection.innerHTML = displayToast.errorToast(
        "Please Enter a Valid Email"
      );
    }

    //api call
  } catch (err) {
    toastSection.innerHTML = displayToast.errorToast(err.message);
  } finally {
    setTimeout(() => {
      toastSection.innerHTML = "";
    }, 3000);
  }
}

function isValidEmail(email) {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
}
