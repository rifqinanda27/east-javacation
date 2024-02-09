// Ketika scroll kebawah navbar menjadi fixed dan blur
const nav = document.getElementById("nav");
const navChild = document.getElementById("navChild");

let initialPosition = nav.offsetTop;

window.addEventListener("scroll", function () {
  if (window.pageYOffset > initialPosition) {
    nav.classList.add("fixed");
    nav.classList.add("top-0");
    navChild.classList.add("shadow");
    navChild.classList.add("backdrop-blur");
    navChild.classList.add("bg-mixed100/[0.4]");
  } else {
    nav.classList.remove("fixed");
    nav.classList.remove("top-0");
    navChild.classList.remove("shadow");
    navChild.classList.remove("backdrop-blur");
    navChild.classList.remove("bg-mixed100/[0.4]");
  }
});

// Ketika button di klik mengarah ke konten
function goToHowToStart() {
  const howToStart = document.getElementById("how-to-start");
  const navbarHeight = document.getElementById("navChild").offsetHeight;
  const offset = navbarHeight + 20;

  window.scroll({
    top: howToStart.offsetTop - offset,
  });
}

var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

var themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
      console.log("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
      console.log("light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});
