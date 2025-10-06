// Checked function
const checkmarks = document.querySelectorAll(".checkmark");
const tasks = document.querySelectorAll(".task");

checkmarks.forEach((checkmark, index) => {
  checkmark.addEventListener('change', () => {
    if(checkmark.checked) {
      tasks[index].style.textDecoration = "line-through";
      tasks[index].style.color = "hsl(235, 19%, 35%)";
    } else {
      tasks[index].style.textDecoration = "";
      tasks[index].style.color = "";
    }
  })
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