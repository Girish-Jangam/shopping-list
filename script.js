itemForm = document.querySelector("#item-form")
itemInput = document.querySelector("#item-input")
itemList = document.querySelector("#item-list")
itemFilter = document.querySelector("#filter")
clearBtn = document.querySelector("#clear")

function onAddItemSubmit(e) {
  e.preventDefault()

  const newItem = itemInput.value
  if (newItem === "") {
    alert("please add items in this field")
    return
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

function addItemToStorage(item) {
  let itemsFromStorage

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = []
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"))
  }

  itemsFromStorage.push(item)

  localStorage.setItem("items", JSON.stringify(itemsFromStorage))
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

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove()
      resetState()
    }
  }
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }
  resetState()
}

function resetState() {
  const currList = itemList.querySelectorAll("li")
  if (currList.length === 0) {
    itemFilter.style.display = "none"
    clearBtn.style.display = "none"
  } else {
    itemFilter.style.display = "block"
    clearBtn.style.display = "block"
  }
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

itemForm.addEventListener("submit", onAddItemSubmit)
itemList.addEventListener("click", removeItem)
clearBtn.addEventListener("click", clearItems)
itemFilter.addEventListener("input", filterItems)

resetState()

// localStorage.setItem("name", "Girish")

// console.log(localStorage.getItem("name"))

// // localStorage.removeItem("name")

// localStorage.clear()
