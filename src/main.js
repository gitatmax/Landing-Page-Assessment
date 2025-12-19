import './styles/main.scss';

// Mobile Menu
const menuButton = document.querySelector('.header__menu-button');
const nav = document.querySelector('.header__nav');
const navLinks = document.querySelectorAll('.header__nav-link');

if (menuButton) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// Form Validation
const form = document.getElementById('lead-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const formMessage = document.getElementById('form-message');

const validateField = (input, errorId) => {
  const error = document.getElementById(errorId);
  const value = input.value.trim();

  if (!value) {
    error.textContent = 'This field is required';
    input.classList.add('lead-form__input--error');
    input.setAttribute('aria-invalid', 'true');
    return false;
  }

  if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    error.textContent = 'Please enter a valid email';
    input.classList.add('lead-form__input--error');
    input.setAttribute('aria-invalid', 'true');
    return false;
  }

  error.textContent = '';
  input.classList.remove('lead-form__input--error');
  input.setAttribute('aria-invalid', 'false');
  return true;
};

const clearError = (input, errorId) => {
  const error = document.getElementById(errorId);
  error.textContent = '';
  input.classList.remove('lead-form__input--error');
  input.setAttribute('aria-invalid', 'false');
};

nameInput.addEventListener('blur', () => validateField(nameInput, 'name-error'));
emailInput.addEventListener('blur', () => validateField(emailInput, 'email-error'));
nameInput.addEventListener('input', () => clearError(nameInput, 'name-error'));
emailInput.addEventListener('input', () => clearError(emailInput, 'email-error'));

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const isNameValid = validateField(nameInput, 'name-error');
  const isEmailValid = validateField(emailInput, 'email-error');

  if (!isNameValid || !isEmailValid) {
    formMessage.textContent = 'Please correct the errors above';
    formMessage.className = 'lead-form__message lead-form__message--error';
    return;
  }

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = 'Submitting...';

  // Simulate form submission for demo
  setTimeout(() => {
    formMessage.textContent = "Thank you! We'll be in touch soon.";
    formMessage.className = 'lead-form__message lead-form__message--success';
    form.reset();
    nameInput.setAttribute('aria-invalid', 'false');
    emailInput.setAttribute('aria-invalid', 'false');
    submitButton.disabled = false;
    submitButton.textContent = 'Get Started Free';
  }, 1000);
});
