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