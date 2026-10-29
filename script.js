const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Otvori meni" : "Zatvori meni");
  mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Otvori meni");
  });
});

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const closeLightboxButton = document.querySelector(".lightbox-close");
let previousFocus = null;

function openLightbox(button) {
  previousFocus = document.activeElement;
  lightboxImage.src = button.dataset.image;
  lightboxImage.alt = button.querySelector("img")?.alt || button.dataset.title || "";
  lightboxCaption.textContent = button.dataset.title || "";
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-active");
  closeLightboxButton.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-active");
  lightboxImage.src = "";
  if (previousFocus) previousFocus.focus();
}

document.querySelectorAll(".image-open").forEach((button) => {
  button.addEventListener("click", () => openLightbox(button));
});

closeLightboxButton.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
});

document.querySelector("#year").textContent = new Date().getFullYear();
