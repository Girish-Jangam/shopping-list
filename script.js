itemForm = document.querySelector("#item-form")
itemInput = document.querySelector("#item-input")
itemList = document.querySelector("#item-list")
itemFilter = document.querySelector("#filter")
clearBtn = document.querySelector("#clear")
formBtn = itemForm.querySelector("button")
let isEditMode = false

function displayItems() {
  const itemsFromStorage = getItemsFromStorage()

  itemsFromStorage.forEach((item) => addItemToDOM(item))

  resetState()
}

function onAddItemSubmit(e) {
  e.preventDefault()

  const newItem = itemInput.value
  if (newItem === "") {
    alert("please add items in this field")
    return
  }

  // Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode")

    removeItemFromStorage(itemToEdit.textContent)
    itemToEdit.classList.remove("edit-mode")
    itemToEdit.remove()
    isEditMode = false
  } else {
    if (checkIfItemExists(newItem)) {
      alert("That item already exists!")
      return
    }
  }

  addItemToDOM(newItem)

  addItemToStorage(newItem)

  resetState()

  itemInput.value = ""
}

function addItemToDOM(item) {
  //Create List Item
  const li = document.createElement("li")
  li.appendChild(document.createTextNode(item))

  const button = createButton("remove-item btn-link text-red")
  li.appendChild(button)

  itemList.appendChild(li)
}

function createButton(classes) {
  const button = document.createElement("button")
  button.className = classes

  const i = createIcon("fa-solid fa-xmark")

  button.appendChild(i)
  return button
}

function createIcon(classes) {
  const Icon = document.createElement("i")
  Icon.className = classes
  return Icon
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage()

  itemsFromStorage.push(item)

  localStorage.setItem("items", JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage() {
  let itemsFromStorage

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = []
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"))
  }

  return itemsFromStorage
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement)
  } else {
    setItemToEdit(e.target)
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage()

  return itemsFromStorage.includes(item)
}

function setItemToEdit(item) {
  isEditMode = true

  itemList
    .querySelectorAll("li")
    .forEach((i) => i.classList.remove("edit-mode"))

  item.classList.add("edit-mode")

  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item'

  formBtn.style.backgroundColor = "#228B22"

  itemInput.value = item.textContent
}

function removeItem(item) {
  if (confirm("Are you sure?")) {
    //Remove item from DOM
    item.remove()

    //Remove item from storage
    removeItemFromStorage(item.textContent)

    resetState()
  }
}

function removeItemFromStorage(item) {
  let itemFromStorage = getItemsFromStorage()

  // Filter out item to be removed
  itemFromStorage = itemFromStorage.filter((i) => i !== item)

  //Re-set to localstorage
  localStorage.setItem("items", JSON.stringify(itemFromStorage))
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }

  //Clear from localStorage
  localStorage.removeItem("items")
  resetState()
}

function resetState() {
  itemInput.value = ""

  const currList = itemList.querySelectorAll("li")
  if (currList.length === 0) {
    itemFilter.style.display = "none"
    clearBtn.style.display = "none"
  } else {
    itemFilter.style.display = "block"
    clearBtn.style.display = "block"
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i>   Add Item'
  formBtn.style.backgroundColor = "#333"

  isEditMode = false
}

function filterItems(e) {
  const currList = itemList.querySelectorAll("li")
  const text = e.target.value.toLowerCase()

  currList.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase()

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex"
    } else {
      item.style.display = "none"
    }
  })
}

function init() {
  // Event Listeners
  itemForm.addEventListener("submit", onAddItemSubmit)
  itemList.addEventListener("click", onClickItem)
  clearBtn.addEventListener("click", clearItems)
  itemFilter.addEventListener("input", filterItems)
  document.addEventListener("DOMContentLoaded", displayItems)
  resetState()
}

init()

// localStorage.setItem("name", "Girish")

// console.log(localStorage.getItem("name"))

// // localStorage.removeItem("name")

// localStorage.clear()
