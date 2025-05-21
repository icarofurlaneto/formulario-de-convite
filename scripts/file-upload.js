// File upload functionality
document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('cover-photo');
  const fileNameDisplay = document.getElementById('file-name');

  if (fileInput && fileNameDisplay) {
    fileInput.addEventListener('change', function() {
      if (fileInput.files.length > 0) {
        fileNameDisplay.textContent = fileInput.files[0].name;
          // Hide error message if present
        const errorMessage = fileInput.closest('.cover-photo')?.querySelector('.error-message');
        if (errorMessage) {
          errorMessage.classList.remove('show');
        }
      } else {
        fileNameDisplay.textContent = 'Nenhum arquivo selecionado';
      }
    });
  }
});
