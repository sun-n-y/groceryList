const form = document.querySelector('.form-container');
const alert = document.querySelector('.alert');
const input = document.querySelector('#input');
const submitBtn = document.querySelector('.submit-btn');
const listContainer = document.querySelector('.list-container');
const clearBtn = document.querySelector('.clear-btn');

let editFlag = false;
let editID = '';

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
    const editBtn = element.querySelector('.edit-btn');
    editBtn.addEventListener('click', editItem);
    const deleteBtn = element.querySelector('.trash-btn');
    deleteBtn.addEventListener('click', deleteItem);
    restoreForm();
  } else if (editFlag && inputValue) {
    console.log(inputValue, editID);
  }
  if (listContainer.contains(listContainer.firstChild)) {
    clearBtn.classList.add('show-clearbtn');
  }
});

//delete
function deleteItem(e) {
  e.preventDefault();
  listContainer.removeChild(e.target.parentElement.parentElement.parentElement);
  showAlert('item removed', 'fail');
  restoreForm();
  submitBtn.textContent = 'submit';
  if (listContainer.contains(listContainer.firstChild)) {
    clearBtn.classList.add('show-clearbtn');
  } else {
    clearBtn.classList.remove('show-clearbtn');
    showAlert('list emptied', 'fail');
  }
}

//edit
function editItem(e) {
  e.preventDefault();
  const itemValue =
    e.target.parentElement.parentElement.previousElementSibling.textContent;
  input.value = itemValue;
  editFlag = true;
  submitBtn.textContent = 'edit';
  editID = e.target.parentElement.parentElement.parentElement.dataset.id;
}

// clear btn
clearBtn.addEventListener('click', (e) => {
  e.preventDefault();
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }
  showAlert('list emptied', 'fail');
  restoreForm();
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
