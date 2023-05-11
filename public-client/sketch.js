const URL = `http://${window.location.hostname}:8080`;
let socket = io(URL, {
    path: '/real-time'
});

// Get form, checkbox, and submit button elements
const form = document.querySelector('form');
const agreeCheckbox = document.getElementById('privacy-agreement');
const submitButton = document.getElementById('submit-btn');

// Listen for input changes
form.addEventListener('input', () => {
  // Check if all required inputs are filled and the checkbox is checked
  const inputs = Array.from(form.elements).filter((element) => element.tagName === 'INPUT' && element.required);
  const isFormValid = inputs.every((input) => input.value.trim() !== '') && agreeCheckbox.checked;

  // Enable or disable the submit button
  submitButton.disabled = !isFormValid;
});

// Listen for checkbox change event
agreeCheckbox.addEventListener('change', () => {
  // Trigger input event to update the submit button
  const event = new Event('input');
  form.dispatchEvent(event);
});


