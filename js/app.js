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

// Code card typewriter animation
(function initCodeTyper() {
  var output = document.querySelector(".code-card__body code");
  if (!output) return;

  // Tokens: { c: cssClass ('' for plain), t: text }
  var tokens = [
    { c: "ct-kw",    t: "const" },
    { c: "",         t: " " },
    { c: "ct-var",   t: "developer" },
    { c: "",         t: " " },
    { c: "ct-op",    t: "=" },
    { c: "",         t: " " },
    { c: "ct-punct", t: "{" },
    { c: "",         t: "\n  " },
    { c: "ct-key",   t: "name" },
    { c: "ct-punct", t: ":" },
    { c: "",         t: "     " },
    { c: "ct-str",   t: '"Ben Clauser"' },
    { c: "ct-punct", t: "," },
    { c: "",         t: "\n  " },
    { c: "ct-key",   t: "role" },
    { c: "ct-punct", t: ":" },
    { c: "",         t: "     " },
    { c: "ct-str",   t: '"Front-End Dev"' },
    { c: "ct-punct", t: "," },
    { c: "",         t: "\n  " },
    { c: "ct-key",   t: "stack" },
    { c: "ct-punct", t: ":" },
    { c: "",         t: "    " },
    { c: "ct-punct", t: "[" },
    { c: "",         t: "\n    " },
    { c: "ct-str",   t: '"HTML"' },
    { c: "ct-punct", t: "," },
    { c: "",         t: "\n    " },
    { c: "ct-str",   t: '"TailwindCSS"' },
    { c: "ct-punct", t: "," },
    { c: "",         t: "\n    " },
    { c: "ct-str",   t: '"JavaScript"' },
    { c: "ct-punct", t: "," },
    { c: "",         t: "\n    " },
    { c: "ct-str",   t: '"Liquid"' },
    { c: "ct-punct", t: "," },
    { c: "",         t: "\n    " },
    { c: "ct-str",   t: '"Shopify"' },
    { c: "",         t: "\n  " },
    { c: "ct-punct", t: "]," },
    { c: "",         t: "\n  " },
    { c: "ct-key",   t: "tools" },
    { c: "ct-punct", t: ":" },
    { c: "",         t: "    " },
    { c: "ct-punct", t: "[" },
    { c: "ct-str",   t: '"Figma"' },
    { c: "ct-punct", t: "," },
    { c: "",         t: " " },
    { c: "ct-str",   t: '"GDScript"' },
    { c: "ct-punct", t: "," },
    { c: "",         t: " " },
    { c: "ct-str",   t: '"Photoshop"' },
    { c: "ct-punct", t: "]," },
    { c: "",         t: "\n  " },
    { c: "ct-key",   t: "available" },
    { c: "ct-punct", t: ":" },
    { c: "",         t: " " },
    { c: "ct-bool",  t: "true" },
    { c: "",         t: "\n" },
    { c: "ct-punct", t: "};" },
    { c: "",         t: "\n\n" },
    { c: "ct-fn",    t: "console" },
    { c: "ct-punct", t: "." },
    { c: "ct-fn",    t: "log" },
    { c: "ct-punct", t: "(" },
    { c: "",         t: "\n  " },
    { c: "ct-str",   t: '"Let\'s build something"' },
    { c: "",         t: "\n" },
    { c: "ct-punct", t: ");" }
  ];

  var cursor = document.createElement("span");
  cursor.className = "type-cursor";
  cursor.textContent = "▋";
  output.appendChild(cursor);

  var ti = 0, ci = 0, currentSpan = null;
  var BASE = 15;

  function typeNext() {
    if (ti >= tokens.length) {
      setTimeout(function () { cursor.style.display = "none"; }, 1800);
      return;
    }

    var token = tokens[ti];

    if (ci === 0) {
      if (token.c) {
        currentSpan = document.createElement("span");
        currentSpan.className = token.c;
        output.insertBefore(currentSpan, cursor);
      } else {
        currentSpan = null;
      }
    }

    var ch = token.t[ci];

    if (currentSpan) {
      currentSpan.textContent += ch;
    } else {
      output.insertBefore(document.createTextNode(ch), cursor);
    }

    ci++;
    if (ci >= token.t.length) { ti++; ci = 0; }

    var delay = ch === "\n" ? 40 : BASE + (Math.random() * 6 - 3);
    setTimeout(typeNext, Math.max(4, delay));
  }

  // Start after preloader fades
  setTimeout(typeNext, 900);
})();

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
