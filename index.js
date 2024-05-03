function setColorTheme(colorTheme) {
  document.documentElement.className = colorTheme;
  localStorage.setItem("colorTheme", colorTheme);
}

function switchTheme() {
  const colorTheme = localStorage.getItem("colorTheme") === "light" ? "dark" : "light";
  setColorTheme(colorTheme);
}

const colorTheme = localStorage.getItem("colorTheme") ?? "light";
setColorTheme(colorTheme);

const carousel = document.getElementById("carousel-content");
const carouselItems = carousel.children;
const carouselItemsCount = carousel.children.length;
const carouselItemWidth = carousel.offsetWidth;

let currentCarouselItem = 0;

function swipeLeft() {
  if (currentCarouselItem >= 1) {
    currentCarouselItem--;
    carousel.style.transform = `translateX(-${carouselItemWidth * currentCarouselItem}px)`
    carouselItems[currentCarouselItem].className = "current-carousel-item"
    carouselItems[currentCarouselItem + 1].classList.remove("current-carousel-item");
  }
}

function swipeRight() {
  if (currentCarouselItem < carouselItemsCount - 1) {
    currentCarouselItem++;
    carousel.style.transform = `translateX(-${carouselItemWidth * currentCarouselItem}px)`
    carouselItems[currentCarouselItem].className += "current-carousel-item"
    carouselItems[currentCarouselItem - 1].classList.remove("current-carousel-item");
  }
}


