// Preloader
const preloader = document.querySelector(".preloader");
window.addEventListener("load", function () {
  preloader.classList.add("hide-preloader");
});

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const mobileMenu = document.getElementById("mobileMenu");

navToggle.addEventListener("click", function () {
  mobileMenu.classList.toggle("active");
});

// Close mobile menu when a link is clicked
document.querySelectorAll(".mobile-links a").forEach(function (link) {
  link.addEventListener("click", function () {
    mobileMenu.classList.remove("active");
  });
});

// Show/hide scroll-to-top button
const topLink = document.querySelector(".top-link");
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 400) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

// Load more: show cards per section based on screen size, reveal rest on click
(function initLoadMore() {
  function getMax() {
    return window.innerWidth <= 540 ? 3 : 5;
  }

  document.querySelectorAll(".flex-container").forEach(function (grid) {
    const cards = Array.from(grid.querySelectorAll(".card-item"));
    const MAX = getMax();
    if (cards.length <= MAX) return;

    cards.slice(MAX).forEach(function (card) {
      card.classList.add("card-hidden");
    });

    const remaining = cards.length - MAX;
    const btn = document.createElement("button");
    btn.className = "load-more-btn";
    btn.innerHTML = "Load More <span class='load-more-count'>+" + remaining + "</span>";
    grid.insertAdjacentElement("afterend", btn);

    btn.addEventListener("click", function () {
      grid.querySelectorAll(".card-item.card-hidden").forEach(function (card) {
        card.classList.remove("card-hidden");
      });
      btn.remove();
    });
  });
})();
