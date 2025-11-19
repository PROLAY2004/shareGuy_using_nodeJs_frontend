const uploadBtn = document.getElementById("uploadBtn")
const downloadBtn = document.getElementById("downloadBtn")
const uploadSection = document.getElementById("uploadSection")
const downloadSection = document.getElementById("downloadSection")

// toggle Nav buttons
uploadBtn.addEventListener("click", showUploadSection)
downloadBtn.addEventListener("click", showDownloadSection)

function showUploadSection(){
    // Change Active Button
    uploadBtn.classList.add('header__nav-link--active')
    downloadBtn.classList.remove('header__nav-link--active')
    
    // change Section Contents
    uploadSection.classList.remove('d-none')
    downloadSection.classList.add('d-none')
}

function showDownloadSection(){
    // Change Active Button
    uploadBtn.classList.remove('header__nav-link--active')
    downloadBtn.classList.add('header__nav-link--active')

    // change Section Contents
    uploadSection.classList.add('d-none')
    downloadSection.classList.remove('d-none')
}