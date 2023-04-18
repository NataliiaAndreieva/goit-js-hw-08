import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onFormData, 500));
form.addEventListener('submit', onFormSubmit);


let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
const { email, message } = form.elements;

populateForm();

function onFormData(evt) {
  formData = { email: email.value, message: message.value };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  if (formData) {
    email.value = formData.email || '';
    message.value = formData.message || '';
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  console.dir({ email: email.value, message: message.value });

   if (email.value === '' || message.value === '') {
     return alert('Всі поля мають бути заповнені');
   }

  localStorage.removeItem(STORAGE_KEY);
  evt.currentTarget.reset();
  formData = {};
 }
