const form = document.querySelector('.form-container');
const alert = document.querySelector('.alert');
const input = document.querySelector('#input');
const submitBtn = document.querySelector('.submit-btn');
const listContainer = document.querySelector('.list-container');
const clearBtn = document.querySelector('.clear-btn');

let editFlag = false;
let editID = '';
let editElement;

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
    setItem(inputValue, id);
    showAlert('item added to list', 'sucess');
    const editBtn = element.querySelector('.edit-btn');
    editBtn.addEventListener('click', editItem);
    const deleteBtn = element.querySelector('.trash-btn');
    deleteBtn.addEventListener('click', deleteItem);
    restoreForm();
  } else if (editFlag && inputValue) {
    editElement.firstChild.textContent = inputValue;
    showAlert('item edited', 'sucess');
    editItemLocaleStorage(inputValue, editElement.dataset.id);
    restoreForm();
  }
  if (listContainer.contains(listContainer.firstChild)) {
    clearBtn.classList.add('show-clearbtn');
  }
});

//delete
function deleteItem(e) {
  e.preventDefault();
  const deleteId =
    e.target.parentElement.parentElement.parentElement.dataset.id;
  let list = JSON.parse(localStorage.getItem('list'));
  list = list.filter(function (obj) {
    return obj.id != deleteId;
  });
  localStorage.setItem('list', JSON.stringify(list));
  listContainer.removeChild(e.target.parentElement.parentElement.parentElement);
  showAlert('item removed', 'fail');
  restoreForm();
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
  editElement = e.target.parentElement.parentElement.parentElement;
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

//set item to locale storage
function setItem(value, id) {
  let list;
  if (localStorage.getItem('list')) {
    list = JSON.parse(localStorage.getItem('list'));
  } else {
    list = [];
  }
  list.push({ id, value });
  localStorage.setItem('list', JSON.stringify(list));
}

//edit item local storage
function editItemLocaleStorage(value, id) {
  const list = JSON.parse(localStorage.getItem('list'));
  const searchObject = list.find((item) => item.id == id);
  searchObject.value = value;
  localStorage.setItem('list', JSON.stringify(list));
}

// restore form
function restoreForm() {
  input.value = '';
  editFlag = false;
  editID = '';
  editElement = '';
  submitBtn.textContent = 'submit';
}
