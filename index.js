// Theme switcher
function setColorTheme(colorTheme) {
  const themeIcon = document.getElementById("theme-icon");

  document.documentElement.className = colorTheme;
  localStorage.setItem("colorTheme", colorTheme);

  if (colorTheme === "light") {
    themeIcon.classList.replace("fa-sun", "fa-moon");
  } else {
    themeIcon.classList.replace("fa-moon", "fa-sun");
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

// i18n
let locale = localStorage.getItem("language") ?? "pl";

const translations = {
  // English translations
  "en": {
    "skills": "Skills",
    "projects": "Projects",
    "experience": "Experience",
    "education": "Education",
    "resume": "Resume",
    "summary": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perferendis consequuntur laudantium dignissimos expedita vitae quibusdam ex autem eius incidunt impedit, voluptatibus odit quis quidem ea quae aspernatur labore eos aperiam assumenda nisi, asperiores et! Corrupti tenetur quia perspiciatis a.",

  },
  // Polish translations
  "pl": {
    "skills": "Umiejętności",
    "projects": "Projekty",
    "experience": "Doświadczenie",
    "education": "Edukacja",
    "resume": "CV",
    "summary": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias perferendis consequuntur laudantium dignissimos expedita vitae quibusdam ex autem eius incidunt impedit, voluptatibus odit quis quidem ea quae aspernatur labore eos aperiam assumenda nisi, asperiores et! Corrupti tenetur quia perspiciatis a."
  },
};

const texts = document
  .querySelectorAll("[data-i18n-key]");

setTranslations(locale);

function setTranslations(language) {
  locale = language;
  localStorage.setItem("language", language);
  texts.forEach(translateElement);
  const localeMenu = document.getElementById("locale-menu");
  const clickedOption = document.getElementById(language);

  localeMenu.insertBefore(clickedOption, localeMenu.firstChild);
}

function translateElement(element) {
  const key = element.getAttribute("data-i18n-key");
  const translation = translations[locale][key];
  element.innerText = translation;
}