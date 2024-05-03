// Theme switcher
function setColorTheme(colorTheme) {
  const themeIcon = document.getElementById("theme-icon");

  document.documentElement.className = colorTheme;
  localStorage.setItem("colorTheme", colorTheme);

  if (colorTheme === "light") {
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
}

function switchTheme() {
  const colorTheme = localStorage.getItem("colorTheme") === "light" ? "dark" : "light";
  
  setColorTheme(colorTheme);
}

const colorTheme = localStorage.getItem("colorTheme") ?? "light";
setColorTheme(colorTheme);


// Technologies preview
let technologiesDisplayType = "grid";

// carousel
let currentCarouselItem = 0;

function swipeLeft() {
  const carousel = document.getElementById("carousel-content");
  const carouselItems = carousel.children;
  const carouselItemWidth = carousel.offsetWidth;

  if (currentCarouselItem >= 1) {
    currentCarouselItem--;
    carousel.style.transform = `translateX(-${carouselItemWidth * currentCarouselItem}px)`;
    carouselItems[currentCarouselItem].className += " current-carousel-item";
    carouselItems[currentCarouselItem + 1].classList.remove("current-carousel-item");
  }
}

function swipeRight() {
  const carousel = document.getElementById("carousel-content");
  const carouselItems = carousel.children;
  const carouselItemsCount = carousel.children.length;
  const carouselItemWidth = carousel.offsetWidth;

  if (currentCarouselItem < carouselItemsCount - 1) {
    currentCarouselItem++;
    carousel.style.transform = `translateX(-${carouselItemWidth * currentCarouselItem}px)`;
    carouselItems[currentCarouselItem].className += " current-carousel-item";
    carouselItems[currentCarouselItem - 1].classList.remove("current-carousel-item");
  }
}

// grid
function switchTechnologiesDisplayType() {
  const technologiesDisplayIcon = document.getElementById("technologies-display-icon");
  const technologiesPreview = document.getElementById("technologies-preview");

  switch (technologiesDisplayType) {
    case "carousel":
      technologiesDisplayType = "grid";
      technologiesPreview.classList.replace("carousel", "grid");
      technologiesDisplayIcon.classList.replace("fa-th", "fa-list");
      break;

    case "grid":
      technologiesDisplayType = "carousel";
      technologiesPreview.classList.replace("grid", "carousel");
      technologiesDisplayIcon.classList.replace("fa-list", "fa-th");
      break;

    default:
      console.log("You broke my page!");
  }

  return;
}