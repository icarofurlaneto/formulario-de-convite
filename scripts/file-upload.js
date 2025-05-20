// File upload functionality
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('cover-photo');
    const fileName = document.getElementById('file-name');

    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            // Display the selected file name
            fileName.textContent = fileInput.files[0].name;
        } else {
            // Reset to default text if no file is selected
            fileName.textContent = 'Nenhum arquivo selecionado';
        }
    });
});
