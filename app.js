const form = document.querySelector('.form-container');
const alert = document.querySelector('.alert');
const input = document.querySelector('#input');
const submitBtn = document.querySelector('.submit-btn');

let editFlag = false;
let editID = '';
let editBtn = 'edit';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!editFlag && input.value == '') {
    showAlert('please enter value', 'fail');
  }
});

function showAlert(text, alertType) {
  alert.textContent = `${text}`;
  alert.classList.add(alertType);
  setTimeout(() => {
    alert.textContent = ``;
    alert.classList.remove(alertType);
  }, 2000);
}
