// Form validation functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all required inputs
  const requiredInputs = document.querySelectorAll('input[required], textarea[required]');
  const form = document.querySelector('form');

  // Initially hide all error messages
  hideAllErrorMessages();

  // Add blur event listener to all required fields
  requiredInputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
    
    // Add focus event to hide error message when user starts typing
    input.addEventListener('focus', function() {
      const errorMessage = getErrorMessageElement(this);
      errorMessage.style.display = 'none';
    });
  });

  // Add submit event listener to the form
  form.addEventListener('submit', function(event) {
    let isValid = true;
    
    // Validate all required fields
    requiredInputs.forEach(input => {
      if (!validateField(input)) {
        isValid = false;
      }
    });
    
    // Prevent form submission if validation fails
    if (!isValid) {
      event.preventDefault();
      // Scroll to the first error
      const firstError = document.querySelector('.error-message[style="display: flex;"]');
      if (firstError) {
        firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });

  // Function to hide all error messages
  function hideAllErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => {
      message.style.display = 'none';
    });
  }

  // Function to validate a field and show/hide error message accordingly
  function validateField(field) {
    const errorMessage = getErrorMessageElement(field);
    
    // Different validation depending on field type
    let isValid = true;
    
    if (field.type === 'file') {
      isValid = field.files.length > 0;
    } else if (field.type === 'email') {
      isValid = field.value.trim() !== '' && /^\S+@\S+\.\S+$/.test(field.value);
    } else if (field.type === 'tel') {
      isValid = field.value.trim() !== '' && /^(\(\d{2}\)\s*)?\d{5}-\d{4}$/.test(field.value.trim());
    } else {
      isValid = field.value.trim() !== '';
    }
    
    // Show or hide error message
    if (!isValid) {
      errorMessage.style.display = 'flex';
    } else {
      errorMessage.style.display = 'none';
    }
    
    return isValid;
  }

  // Function to get the error message element for a field
  function getErrorMessageElement(field) {
    // The error message is the next sibling with class 'error-message'
    return field.nextElementSibling?.classList.contains('error-message') 
      ? field.nextElementSibling 
      : field.parentElement.querySelector('.error-message');
  }
});
