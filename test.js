const form = document.getElementById('contactForm');
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');
const successOverlay = document.getElementById('success-overlay');
const closeBtn = document.getElementById('close-btn');

// Add real-time validation for each input
inputs.forEach(input => {
  // Validate input on blur (delayed validation)
  input.addEventListener('blur', validateInput);

  // Clear error state on click/focus
  input.addEventListener('focus', clearErrorState);
});

// Validate input when blurred
function validateInput(event) {
  const input = event.target;
  const errorMsg = input.previousElementSibling.querySelector('.error-msg');

  // Clear previous error message
  errorMsg.textContent = '';

  // Validate the input
  if (input.value.trim() === "" || !input.checkValidity()) {
    input.classList.add('error');
    if (input.value.trim() === "") {
      errorMsg.textContent = "This field is required.";
    } else {
      if (input.type === 'email') {
        errorMsg.textContent = "Please enter a valid email.";
      } else if (input.type === 'password' && input.value.length < 6) {
        errorMsg.textContent = "Password must be at least 6 characters.";
      } else if (input.tagName.toLowerCase() === 'textarea') {
        errorMsg.textContent = "Please provide a message.";
      }
    }
  } else {
    input.classList.remove('error');
  }
}

// Clear error state on click/focus
function clearErrorState(event) {
  const input = event.target;
  const errorMsg = input.previousElementSibling.querySelector('.error-msg');
  
  // Remove error class and clear error message
  input.classList.remove('error');
  errorMsg.textContent = '';
}

// Form submission handling
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  // Check if all inputs are valid
  let allValid = true;
  inputs.forEach(input => {
    const errorMsg = input.previousElementSibling.querySelector('.error-msg');
    if (input.value.trim() === "" || !input.checkValidity()) {
      input.classList.add('error');
      if (input.value.trim() === "") {
        errorMsg.textContent = "This field is required.";
      }
      allValid = false;
    } else {
      input.classList.remove('error');
    }
  });

  if (allValid) {
    showSuccessMessage();
    form.reset(); // Reset form fields
  }
});

// Clear errors function (in case you want to call it elsewhere)
function clearErrors() {
  inputs.forEach(input => {
    input.classList.remove('error'); // Remove error class from inputs
    const errorMsg = input.previousElementSibling.querySelector('.error-msg');
    errorMsg.textContent = ''; // Clear error message text
  });
}

// Show success message
function showSuccessMessage() {
  successOverlay.style.display = 'flex'; // Display the success overlay
}

// Close the success overlay
closeBtn.addEventListener('click', function() {
  successOverlay.style.display = 'none';
});