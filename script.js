// Checked function
const todoList = document.querySelector(".todo-list");
const tasks = document.querySelectorAll(".task");

todoList.addEventListener('change', (event) => {
  if(event.target.classList.contains("checkmark")) {
    
    const closestSubCon = event.target.closest(".items-sub-container");

    if(closestSubCon) {

      const task = closestSubCon.querySelector(".task");

      if(task) {
        if(event.target.checked) {
          task.style.textDecoration = "line-through";
          task.style.color = "hsl(235, 19%, 35%)";
        } else {
          task.style.textDecoration = "";
          task.style.color = "";
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
let itemsCount = document.querySelector(".items-count");

todoList.addEventListener('click', (event) => {
  if(event.target.classList.contains("remove-icon")) {
    const closestItem = event.target.closest(".items");

    if(closestItem) {
      closestItem.remove();
    }

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

      addTask.innerHTML = `
        <div class="items-sub-container">
          <label class="checkmark-label">
            <input type="checkbox" class="checkmark">
            <img src="assets/images/icon-check.svg" alt="checked" class="checked">
          </label>
          <p class="task">${newTask}</p>
        </div>
        <img src="assets/images/icon-cross.svg" alt="remove icon" class="remove-icon">
      `;

      todoList.appendChild(addTask);
      addTaskInput.value = '';

      const currentItemsCount = todoList.querySelectorAll(".items").length;
      itemsCount.textContent = currentItemsCount;

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

    isEmpty();
})

function isEmpty() {
  const currentItemsCount = todoList.querySelectorAll(".items").length;

  if(currentItemsCount === 0) {
    todoList.classList.add("empty-todo-list");
    emptyTodo.style.display = "block";
  }

  itemsCount.textContent = currentItemsCount;
}

// Todo Filter
const filterAll = document.querySelectorAll(".filter__all");
const filterActive = document.querySelectorAll(".filter__active");
const filterInactive = document.querySelectorAll(".filter__inactive");
let taskCount = 0;

function showAll() {
  const items = todoList.querySelectorAll(".items");
  taskCount = 0;

  items.forEach(item => {
    item.style.display = "flex"
    taskCount++;
  })

  itemsCount.textContent = taskCount;
}

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

showAll();

filterAll.forEach(all => {
  all.addEventListener('change', showAll);
})

filterActive.forEach(active => {

  active.addEventListener('change', () => {
    showAll();
    const items = todoList.querySelectorAll(".items")
    const checkmarks = todoList.querySelectorAll(".checkmark");

    checkmarks.forEach((checkmark, index) => {
      if(checkmark.checked) {
        items[index].style.display = "none";
        taskCount--;
      }
    })

    itemsCount.textContent = taskCount;
  })

})

filterInactive.forEach(inactive => {

  inactive.addEventListener('change', () => {
    showAll();
    const items = todoList.querySelectorAll(".items")
    const checkmarks = todoList.querySelectorAll(".checkmark");

    checkmarks.forEach((checkmark, index) => {
      if(!checkmark.checked) {
        items[index].style.display = "none";
        taskCount--;
      }
    })

    itemsCount.textContent = taskCount;
  })

})