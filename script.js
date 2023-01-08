"use strict";

const nav = document.querySelector(".nav-container");
const header = document.querySelector("header");
const navLinks = document.querySelectorAll(".nav-link");
const hambuger = document.querySelector(".menu-button");
const navs = document.querySelector(".navs");

// Fixed navs
const navHeight = nav.getBoundingClientRect().height;

const initialCords = header.getBoundingClientRect();

window.addEventListener("scroll", function () {
  if (window.scrollY > initialCords.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});

// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const loading = function (entries, Observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
};

const imgObserver = new IntersectionObserver(loading, {
  root: null,
  threshold: 1,
  rootMargin: "10px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

//Nav scroll-to
navLinks.forEach((el) => {
  el.addEventListener("click", function (e) {
    e.preventDefault();

    const id = this.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  });
});

// hambuger
hambuger.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".navs").style.display = "block";
});

// hambuger
const navFunc = () => {
  if ((navs.style.display = "none")) {
    navs.style.display = "flex";
    navs.classList.remove("nav-container");
    navs.classList.add("sidenav");
    navs.insertAdjacentHTML(
      "afterbegin",
      `<button class="close-button" style="width: 50px">
        <i class="fas fa-times"></i>
      </button>`
    );
    navs.style.fontSize = "3.2rem";

    const closeHambuger = document.querySelector(".close-button");
    closeHambuger.addEventListener("click", (e) => {
      e.preventDefault();
      navs.classList.remove("sidenav");
      navs.style.display = "none";
      navs.insertAdjacentHTML = null;
    });
  } else {
    navs.style.display = "none";
    navs.classList.remove("sidenav");
  }
};

hambuger.addEventListener("click", navFunc);
