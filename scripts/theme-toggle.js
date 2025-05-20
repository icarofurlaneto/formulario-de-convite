// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const styleToggle = document.getElementById('styleToggle');
    const modeText = document.getElementById('mode-text');

    // Initialize the text based on current state
    updateModeText();

    // Toggle theme and update the text whenever the switch changes
    styleToggle.addEventListener('change', function() {
        updateModeText();
    });

    function updateModeText() {
        if (styleToggle.checked) {
            modeText.textContent = 'Claro';
        } else {
            modeText.textContent = 'Escuro';
        }
    }
});
