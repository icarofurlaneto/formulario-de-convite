// Form validation functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all required inputs
  const requiredInputs = document.querySelectorAll('input[required], textarea[required]');
  const form = document.querySelector('form');

  // Initially hide all error messages
  hideAllErrorMessages();
  
  // Set red border for contact name field by default
  const contactNameField = document.getElementById('contact-name');
  if (contactNameField) {
    contactNameField.style.borderColor = '#FF5959';
  }

  // Add blur event listener to all required fields
  requiredInputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });    // Add focus event to hide error message when user starts typing
    input.addEventListener('focus', function() {
      // Não esconde a mensagem de erro para o campo de nome de contato
      if (this.id === 'contact-name') {
        return;
      }
      
      const errorMessage = getErrorMessageElement(this);
      if (errorMessage) {
        errorMessage.classList.remove('show');
      }
      
      // Remove red border on focus
      if (this.type !== 'checkbox' && this.type !== 'file') {
        this.style.borderColor = '';
      }
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
      const firstError = document.querySelector('.error-message.show');
      if (firstError) {
        firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  });  // Function to hide all error messages
  function hideAllErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => {
      // Verifica se a mensagem de erro não é a do campo de nome de contato
      const isContactNameError = message.previousElementSibling && message.previousElementSibling.id === 'contact-name';
      if (!isContactNameError) {
        message.classList.remove('show');
      } else {
        // Para o campo de nome de contato, mantém visível mesmo ao inicializar
        message.classList.add('show');
      }
    });
    
    // Reset all input borders to default except for contact-name
    requiredInputs.forEach(input => {
      if (input.type !== 'checkbox' && input.type !== 'file') {
        if (input.id !== 'contact-name') {
          input.style.borderColor = '';
        } else {
          input.style.borderColor = '#FF5959'; // Ensure contact-name field has red border
        }
      }
    });
  }
  // Function to validate a field and show/hide error message accordingly
  function validateField(field) {
    const errorMessage = getErrorMessageElement(field);
    // Simplified validation - only check if field is filled
    let isValid = true;
    
    if (field.type === 'file') {
      isValid = field.files.length > 0;
    } else if (field.type === 'checkbox' && field.hasAttribute('required')) {
      isValid = field.checked;
    } else if (field.type === 'email' || field.type === 'tel' || field.type === 'text' || field.type === 'textarea') {
      // Verifica apenas se o campo está preenchido, sem validação de formato
      isValid = field.value.trim() !== '';
    } else {
      isValid = field.value.trim() !== '';
    }
    
    // Show or hide error message and adjust border color
    // Caso especial para o campo de nome de contato
    if (field.id === 'contact-name') {
      // Só remove a mensagem de erro se o campo estiver preenchido corretamente
      if (isValid && errorMessage) {
        errorMessage.classList.remove('show');
        if (field.type !== 'checkbox' && field.type !== 'file') {
          field.style.borderColor = '';
        }
      } else if (errorMessage) {
        errorMessage.classList.add('show');
        if (field.type !== 'checkbox' && field.type !== 'file') {
          field.style.borderColor = '#FF5959';
        }
      }
    } else {
      // Comportamento normal para outros campos
      if (!isValid && errorMessage) {
        errorMessage.classList.add('show');
        if (field.type !== 'checkbox' && field.type !== 'file') {
          field.style.borderColor = '#FF5959';
        }
      } else if (errorMessage) {
        errorMessage.classList.remove('show');
        if (field.type !== 'checkbox' && field.type !== 'file') {
          field.style.borderColor = '';
        }
      }
    }
    
    return isValid;
  }
  // Function to get the error message element for a field
  function getErrorMessageElement(field) {
    // Para o caso específico de checkbox, que pode ter uma estrutura diferente
    if (field.type === 'checkbox') {
      // Procura a mensagem de erro no grupo do checkbox
      return field.closest('.checkbox-group')?.querySelector('.error-message') || null;
    }
    
    // Para o caso específico do upload de arquivo
    if (field.type === 'file') {
      // Sobe mais níveis na árvore DOM para encontrar a mensagem de erro
      return field.closest('.cover-photo')?.querySelector('.error-message') || null;
    }
    
    // Caso padrão: procura no próximo irmão ou no parent
    return field.nextElementSibling?.classList.contains('error-message') 
      ? field.nextElementSibling 
      : field.parentElement.querySelector('.error-message');
  }
});
