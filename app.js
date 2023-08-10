const form = document.querySelector('.form-container');
const alert = document.querySelector('.alert');
const input = document.querySelector('#input');
const submitBtn = document.querySelector('.submit-btn');
const listContainer = document.querySelector('.list-container');

let editFlag = false;
let editID = '';
let submitBtn1 = 'submit';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = input.value;
  if (!editFlag && !inputValue) {
    showAlert('please enter value', 'fail');
  } else if (!editFlag && inputValue) {
    const id = new Date().getTime();
    const element = document.createElement('div');
    element.classList.add('list-item');
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="item-info">${inputValue}</p>
                <div class="btn-container">
                    <button class="edit-btn">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </button>
                    <button class="trash-btn">
                        <i class="fa-solid fa-trash"></i>
                    </button>`;
    listContainer.appendChild(element);
    showAlert('item added', 'sucess');
    restoreForm();
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

function restoreForm() {
  input.value = '';
  editFlag = false;
  submitBtn1 = 'submit';
}
