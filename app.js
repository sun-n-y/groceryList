const form = document.querySelector('.form-container');
const alert = document.querySelector('.alert');
const input = document.querySelector('#input');
const submitBtn = document.querySelector('.submit-btn');
const listContainer = document.querySelector('.list-container');
const clearBtn = document.querySelector('.clear-btn');

let editFlag = false;
let editID = '';
let editBtn = 'edit';

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
    showAlert('item added to list', 'sucess');
    restoreForm();
  }
  if (listContainer.contains(listContainer.firstChild)) {
    clearBtn.classList.add('show-clearbtn');
  }
});

window.addEventListener('click', (e) => {
  if (e.target.parentElement.classList.contains('trash-btn')) {
    e.preventDefault();
    listContainer.removeChild(
      e.target.parentElement.parentElement.parentElement
    );
    showAlert('item removed', 'fail');
    if (listContainer.contains(listContainer.firstChild)) {
      clearBtn.classList.add('show-clearbtn');
    } else {
      clearBtn.classList.remove('show-clearbtn');
      showAlert('list emptied', 'fail');
    }
  }
  if (e.target.parentElement.classList.contains('edit-btn')) {
    e.preventDefault();
    console.log('edit');
  }
});

// clear btn
clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }
  showAlert('list emptied', 'fail');
  setTimeout(() => {
    clearBtn.classList.remove('show-clearbtn');
  }, 1000);
});

// show alert
function showAlert(text, alertType) {
  alert.textContent = `${text}`;
  alert.classList.add(alertType);
  setTimeout(() => {
    alert.textContent = ``;
    alert.classList.remove(alertType);
  }, 2000);
}

// restore form
function restoreForm() {
  input.value = '';
  editFlag = false;
  editID = '';
}
