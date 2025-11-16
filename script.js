// items cound base on filter
const itemsCount = document.querySelector(".items-count");
let count = {
  all: 6,
  active: 6,
  inactive: 0
}

let currentFilter = {
  all: true,
  active: false,
  inactive: false
}


// Display count base on current filter
function displayCount() {
  switch(true) {
    case currentFilter.all:
      itemsCount.textContent = count.all;
      break;
    case currentFilter.active:
      itemsCount.textContent = count.active;
      break;
    case currentFilter.inactive:
      itemsCount.textContent = count.inactive;
      break;
  }
}

// Checked function
const todoList = document.querySelector(".todo-list");
const tasks = document.querySelectorAll(".task");

todoList.addEventListener('change', (event) => {

  if(event.target.classList.contains("checkmark")) {
    const closestSubCon = event.target.closest(".items-sub-container");

    if(closestSubCon) {

      const task = closestSubCon.querySelector(".task");

      if(task) {
        if(event.target.checked && currentFilter.all) {
          getAll();
          task.classList.add("completed");
          count.inactive++;
          count.active--;
          displayCount();
          isEmpty();
        } else if(event.target.checked && currentFilter.active) {
          getAllActive();
          task.classList.add("completed");
          count.inactive++;
          count.active--;
          displayCount();
          isEmpty();
        } else if(!event.target.checked && currentFilter.inactive) {
          getAllInactive();
          task.classList.remove("completed");
          count.inactive--;
          count.active++;
          displayCount();
          isEmpty();
        } else {
          task.classList.remove("completed");
          count.inactive--;
          count.active++;
        }
      }

    }
  }

})

// Header Image Switching
function changeSize() {
  const headerImg = document.querySelector(".header-image");
  const themeToggle = document.querySelector(".light-dark-checkbox");
  
  const images = {
    dark: {
      desktop: "assets/images/bg-desktop-dark.jpg",
      mobile: "assets/images/bg-mobile-dark.jpg"
    },
    light: {
      desktop: "assets/images/bg-desktop-light.jpg",
      mobile: "assets/images/bg-mobile-light.jpg"
    }
  }

  const mobileSize = window.matchMedia("(max-width: 768px)");

  let selectedMobile;
  let selectedDesktop;
  
  if(themeToggle.checked) {
    selectedDesktop = images.light.desktop;
    selectedMobile = images.light.mobile;
  } else {
    selectedDesktop = images.dark.desktop;
    selectedMobile = images.dark.mobile;
  }

  if(mobileSize.matches) {
    headerImg.src = selectedMobile;
  } else {
    headerImg.src = selectedDesktop;
  }
}

changeSize();
window.addEventListener('resize', changeSize);

// Theme Toggle
const themeToggle = document.querySelector(".light-dark-checkbox");
const body = document.querySelector("body");
const toggleIcon = document.querySelector(".light-dark-icon");
const lightIcon = "assets/images/icon-moon.svg";
const darkIcon = "assets/images/icon-sun.svg";

themeToggle.addEventListener('change', () => {
    if(themeToggle.checked) {
      changeSize();
      body.classList.add("light-theme");
      toggleIcon.src = lightIcon;
    } else {
      changeSize();
      body.classList.remove("light-theme");
      toggleIcon.src = darkIcon;
    }
})

// Remove Button function
const emptyTodo = document.querySelector(".empty-todo");
const items = todoList.querySelectorAll(".items");

todoList.addEventListener('click', (event) => {
  if(event.target.classList.contains("remove-icon")) {
    const closestItem = event.target.closest(".items");
    const isActive = closestItem.querySelector(".checkmark");
    
    if(isActive.checked) {
      count.inactive--;
    } else {
      count.active--;
    }

    if(closestItem) {
      closestItem.remove();
      count.all--;
    }
    
    displayCount();  
    isEmpty();

  }
})

// Add Todo
const addTaskInput = document.querySelector(".add-task__input");

addTaskInput.addEventListener('keydown', (event) => {
  if(event.key === 'Enter' ) {

    const newTask = addTaskInput.value.trim();

    if(newTask !== '') {
      const addTask = document.createElement('li');
      addTask.classList.add("items");
      addTask.draggable = true;

      addTask.innerHTML = `
        <div class="items-sub-container">
          <label class="checkmark-label">
            <div class="checkbox-cover"></div>
            <input type="checkbox" class="checkmark">
            <img src="assets/images/icon-check.svg" alt="checked" class="checked">
          </label>
          <p class="task">${newTask}</p>
        </div>
        <img src="assets/images/icon-cross.svg" alt="remove icon" class="remove-icon">
      `;

      todoList.appendChild(addTask);
      addTaskInput.value = '';

      count.all++;
      count.active++;
      itemsCount.textContent = count.all;

      todoList.classList.remove("empty-todo-list");
      emptyTodo.style.display = "";
    }

  }
})

//Clear completed function
const clearCompleted = document.querySelector(".clear-completed");
 
clearCompleted.addEventListener('click', () => {
    const completed = todoList.querySelectorAll(".items");
    const checkmarks = todoList.querySelectorAll(".checkmark");
 
    checkmarks.forEach((checkmark, index) => {
        if(checkmark.checked) {
            completed[index].remove();
        }
    })

    count.all -= count.inactive;
    count.inactive = 0;

    displayCount()
    isEmpty();
})

function isEmpty() {
  if(
    (count.all === 0 && currentFilter.all) ||
    (count.active === 0 && currentFilter.active) ||
    (count.inactive === 0 && currentFilter.inactive)
  ) {
    todoList.classList.add("empty-todo-list");
    emptyTodo.style.display = "block";
  } else {
    todoList.classList.remove("empty-todo-list");
    emptyTodo.style.display = "";
  }

  displayCount();
}

// Todo Filter
const filterAll = document.querySelectorAll(".filter__all");
const filterActive = document.querySelectorAll(".filter__active");
const filterInactive = document.querySelectorAll(".filter__inactive");

function syncFilters(filterType) {

  filterType.forEach(filter => {
    filter.addEventListener('change', () => {
      if(filterType[0].checked || filterType[1].checked) {
        filterType[0].checked = true;
        filterType[1].checked = true;
      }
    })
  })

}

syncFilters(filterAll);
syncFilters(filterActive);
syncFilters(filterInactive);


function filterReset() {
  const items = todoList.querySelectorAll(".items");

  items.forEach(item => {
    item.style.display = "flex";
  })
}

function getAll() {
  filterReset();
  itemsCount.textContent = count.all;
  currentFilter.inactive = false;
  currentFilter.active = false;
  currentFilter.all = true;

  isEmpty();
}

function getAllActive() {
  filterReset();

  const items = todoList.querySelectorAll(".items")
  const checkmarks = todoList.querySelectorAll(".checkmark");

  checkmarks.forEach((checkmark, index) => {
    if(checkmark.checked) {
      items[index].style.display = "none";
    }
  })

  itemsCount.textContent = count.active;
  currentFilter.active = true;
  currentFilter.inactive = false;
  currentFilter.all = false;

  isEmpty();
}

function getAllInactive() {
  filterReset();
  const items = todoList.querySelectorAll(".items")
  const checkmarks = todoList.querySelectorAll(".checkmark");

  checkmarks.forEach((checkmark, index) => {
    if(!checkmark.checked) {
      items[index].style.display = "none";
    }
  })

  itemsCount.textContent = count.inactive;
  currentFilter.inactive = true;
  currentFilter.active = false;
  currentFilter.all = false;

  isEmpty();
}

filterAll.forEach(all => {
  all.addEventListener('change', getAll)
})

filterActive.forEach(active => {
  active.addEventListener('change', getAllActive)
})

filterInactive.forEach(inactive => {
  inactive.addEventListener('change', getAllInactive)
})

function todoListMinHeight() {
  const todoList = document.querySelector(".todo-list");
  const items = todoList.querySelectorAll(".items");

  const itemsHeight = items[0].getBoundingClientRect().height;
  const minHeight = itemsHeight * 6;

  todoList.style.minHeight = `${minHeight}px`;
}

todoListMinHeight();
window.addEventListener('resize', todoListMinHeight);

// Drag and Drop
// 1. Add dragstart and dragend event listeners to draggables

// 2. Add dragover event listener to container and use e.preventDefault 
//    to remove the not allowed cursor

// 3. Inside the dragover event, get the dragged element

// 4. Create a function that returns the closest element where you hover your mouse

// 5. The function must accept container and clientY or the y position of the mouse

// 6. Inside the function, get all the draggable objects that is not currently dragged
//    then put it inside an array and use the spread operator

// 7. Use the reduce function on the array. The reduce must have the accumulator
//    and the current element it is iterating then a call back. The initial value must be an object
//    that contains the lowest posible value (Number.NEGATIVE_INFINITY)
//    array.reduce((accumulator, curr), callback, { initialValue: value})

// 8. Get the getBoundingClientRect() of the current element (curr) and store it inside
//    a variable ("rect" for example)

// 9. Create a variable that holds the offset computation using the drag and drop formula
//    by getting the values from the current element getBoundingClientRect() variable
//    The formula is clientY - rect.top - rect.height / 2.
//    If the output is negative the offset is at the top
//    If the output is positive the offset is at the bottom

//10. Create an if else using the calculated offset using the formula above
//    Since we are targeting the element closest from the top offset:
//    if offset is negative and is greater than the accumulator (which holds the initial value at first iteration)
//    then return the computed offset as the new accumulator as well as the current element as key-value pairs
//    else just return the computed offset as the new accumulator and then it becomes
//    the new reference for the if else condition

//11. Return the reduce function's current element using the stored key-value pair for current element
//    by using the dot notation (reduce().element)

//12. Back in the dragover event, create a variable that will store the closest element returned from the \
//    function we created

//13. Create an if else with conditions:
//    if the returned element is null then append the element at the end of the list 
//    else insert the dragged element before the returned element

// End

todoList.addEventListener('dragstart', (e) => {
  if(e.target.classList.contains("items")) {
    e.target.classList.add("dragging");
  }
})

todoList.addEventListener('dragend', (e) => {
  if(e.target.classList.contains("items")) {
    e.target.classList.remove("dragging");
  }
})

todoList.addEventListener('dragover', (e) => {
  e.preventDefault();
  const afterElement = getAfterElement(e.clientY);
  const dragged = document.querySelector(".dragging");

  if(afterElement == null) {
    todoList.appendChild(dragged);
  } else {
    todoList.insertBefore(dragged, afterElement);
  }
})

function getAfterElement(y) {
  const draggables = [...todoList.querySelectorAll(".items:not(.dragging)")]

  return draggables.reduce((closestPosition, currentElement) => {
    const rect = currentElement.getBoundingClientRect();
    const offset = y - rect.top - rect.height / 2;

    if(offset < 0 && offset > closestPosition.offset) {
      return { offset: offset, element: currentElement};
    } else {
      return closestPosition;
    }
  }, { offset: Number.NEGATIVE_INFINITY, element: null } ).element
}