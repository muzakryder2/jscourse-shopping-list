const itemForm = document.querySelector('#item-form')
const itemInput = document.querySelector('#item-input')
const itemList = document.querySelector('#item-list')
const clearBtn = document.querySelector('#clear')
const itemFilter = document.querySelector('#filter')

function displayItems() {
  const itemsFromStorage = getItemsFromStorage()
  itemsFromStorage.forEach((item) => addItemToDOM(item))
  checkUI()
}

function onAddItemSubmit(e) {
  e.preventDefault()

  const newItem = itemInput.value

  // Validate input
  if (newItem === '') {
    alert('Please add an item')
    return
  }

  addItemToDOM(newItem)
  addItemToStorage(newItem)

  checkUI()

  itemInput.value = ''
}

function addItemToDOM(item) {
  // Create list item
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(item))

  const button = createButton('remove-item btn-link text-red')
  li.appendChild(button)

  itemList.appendChild(li)
}

function createButton(classes) {
  const button = document.createElement('button')
  const icon = createIcon('fa-solid fa-xmark')
  button.className = classes
  button.appendChild(icon)
  return button
}

function createIcon(classes) {
  const icon = document.createElement('i')
  icon.className = classes
  return icon
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage()

  itemsFromStorage.push(item)
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage() {
  let itemsFromStorage

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = []
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
  }

  return itemsFromStorage
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement)
  }
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    item.remove()
    removeItemFromStorage(item.textContent)
    checkUI()
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage()
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item)

  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }

  localStorage.removeItem('items')
  checkUI()
}

function filterItems(e) {
  const text = e.target.value.toLowerCase()
  const items = itemList.querySelectorAll('li')
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase()
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
}

function checkUI() {
  const items = itemList.querySelectorAll('li')
  if (items.length === 0) {
    clearBtn.style.display = 'none'
    itemFilter.style.display = 'none'
  } else {
    clearBtn.style.display = 'block'
    itemFilter.style.display = 'block'
  }
}

// Initialize App
function init() {
  // Event listeners
  itemForm.addEventListener('submit', onAddItemSubmit)
  itemList.addEventListener('click', onClickItem)
  clearBtn.addEventListener('click', clearItems)
  itemFilter.addEventListener('input', filterItems)
  document.addEventListener('DOMContentLoaded', displayItems)
}

init()
