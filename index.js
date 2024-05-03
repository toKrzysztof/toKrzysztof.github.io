function setColorTheme(colorTheme) {
  document.documentElement.className = colorTheme;
  localStorage.setItem("colorTheme", colorTheme);
}

function switchTheme() {
  const colorTheme = localStorage.getItem("colorTheme") === "light" ? "dark" : "light";
  setColorTheme(colorTheme);
}

const colorTheme = localStorage.getItem("colorTheme")
setColorTheme(colorTheme);

const carousel = document.getElementById("carousel-content");
const carouselItemsCount = carousel.childElementCount;
const carouselItemWidth = carousel.offsetWidth;

let currentCarouselItem = 0;

function swipeLeft() {
  if (currentCarouselItem >= 1) {
    currentCarouselItem--;
    console.log(currentCarouselItem)
    carousel.style.transform = `translateX(-${carouselItemWidth * currentCarouselItem}px)`
  }
}

function swipeRight() {
  if (currentCarouselItem < carouselItemsCount - 1) {
    currentCarouselItem++;
    console.log(currentCarouselItem)
    carousel.style.transform = `translateX(-${carouselItemWidth * currentCarouselItem}px)`
  }
}


