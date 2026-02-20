//nav 
const menuToggle = document.querySelector(".menu-toggle");
const navBar = document.querySelector(".nav-bar");

menuToggle.addEventListener("click", () => {
  navBar.classList.toggle("active");
});
//scroll effect
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav-bar");
  if (nav) {
    nav.classList.toggle("scrolled", window.scrollY > 50);
  }
});
//Theme
const themeToggle = document.getElementById("themeToggle");
const body = document.body;
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  body.classList.add("light");
} else {
  body.classList.remove("light");
}


themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    body.classList.contains("light") ? "light" : "dark"
  );
});

