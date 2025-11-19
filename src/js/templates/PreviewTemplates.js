export default class PreviewTemplates {
  txtPreview = (fileName, fileSize) => {
    return `<li class="upload__file-item">
                    <i class="fa fa-file-text upload__file-icon"></i>
                    <span class="upload__file-name">${fileName}</span>
                    <span class="upload__file-size">${fileSize} MB</span>
                </li>`;
  };

  pdfPreview = (fileName, fileSize) => {
    return `<li class="upload__file-item">
                    <i class="fas fa-file-pdf upload__file-icon"></i>
                    <span class="upload__file-name">${fileName}</span>
                    <span class="upload__file-size">${fileSize} MB</span>
                </li>`;
  };

  imagePreview = (fileName, fileSize) => {
    return `<li class="upload__file-item">
                <i class="fa fa-file-photo-o upload__file-icon"></i>
                <span class="upload__file-name">${fileName}</span>
                <span class="upload__file-size">${fileSize} MB</span>
            </li>`;
  };

  videoPreview = (fileName, fileSize) => {
    return `<li class="upload__file-item">
                <i class="fa fa-file-video-o upload__file-icon"></i>
                <span class="upload__file-name">${fileName}</span>
                <span class="upload__file-size">${fileSize} MB</span>
            </li>`;
  };

  compressedPreview = (fileName, fileSize) => {
    return `<li class="upload__file-item">
                <i class="fa fa-file-archive-o upload__file-icon"></i>
                <span class="upload__file-name">${fileName}</span>
                <span class="upload__file-size">${fileSize} MB</span>
            </li>`;
  };

  filePreview = (fileName, fileSize) => {
    return `<li class="upload__file-item">
                <i class="fa fa-file upload__file-icon"></i>
                <span class="upload__file-name">${fileName}</span>
                <span class="upload__file-size">${fileSize} MB</span>
            </li>`;
  };
}
