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

// Apply load-more behaviour to a single section
function applyLoadMore(section) {
  const grid = section.querySelector(".flex-container");
  if (!grid) return;

  // Remove any existing load-more button
  const nextEl = grid.nextElementSibling;
  if (nextEl && nextEl.classList.contains("load-more-btn")) nextEl.remove();

  // Reset all cards to visible / clean state
  const cards = Array.from(grid.querySelectorAll(".card-item"));
  cards.forEach(function (card) {
    card.classList.remove("card-hidden", "card-reveal");
    card.style.animationDelay = "";
  });

  const MAX = window.innerWidth <= 540 ? 3 : 5;
  if (cards.length <= MAX) return;

  cards.slice(MAX).forEach(function (card) {
    card.classList.add("card-hidden");
  });

  const remaining = cards.length - MAX;
  const btn = document.createElement("button");
  btn.className = "load-more-btn";
  btn.textContent = "Show " + remaining + " More";
  grid.insertAdjacentElement("afterend", btn);

  btn.addEventListener("click", function () {
    const hidden = Array.from(grid.querySelectorAll(".card-item.card-hidden"));
    hidden.forEach(function (card, i) {
      card.classList.remove("card-hidden");
      card.style.animationDelay = (i * 0.06) + "s";
      card.classList.add("card-reveal");
    });
    btn.remove();
  });
}

// Initialise load-more for all sections up front
function initLoadMore() {
  document.querySelectorAll(".section").forEach(function (section) {
    applyLoadMore(section);
  });
}

// Tab switching
function initTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const sections = document.querySelectorAll(".section");
  const sectionTitle = document.getElementById("dynamic-section-title");

  // Activate the Recents tab by default
  const defaultSection = document.getElementById("recents");
  if (defaultSection) defaultSection.classList.add("tab-active");

  function updateTitle(targetId) {
    if (!sectionTitle) return;
    const label = targetId === "recents"
      ? "Selected Works"
      : document.querySelector('.tab-btn[data-target="' + targetId + '"]').textContent.trim();
    sectionTitle.style.opacity = "0";
    setTimeout(function () {
      sectionTitle.textContent = label;
      sectionTitle.style.opacity = "1";
    }, 150);
  }

  function switchTab(targetId) {
    tabs.forEach(function (t) {
      const active = t.dataset.target === targetId;
      t.classList.toggle("tab-btn--active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });

    sections.forEach(function (s) { s.classList.remove("tab-active"); });

    const target = document.getElementById(targetId);
    if (!target) return;

    target.classList.add("tab-active");
    applyLoadMore(target);
    updateTitle(targetId);
  }

  tabs.forEach(function (btn) {
    btn.addEventListener("click", function () {
      switchTab(btn.dataset.target);
    });
  });

  // Intercept navbar / mobile-menu anchor links that point to a section
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    const targetId = link.getAttribute("href").slice(1);
    if (!document.querySelector('.tab-btn[data-target="' + targetId + '"]')) return;

    link.addEventListener("click", function (e) {
      e.preventDefault();
      switchTab(targetId);
      const tabsEl = document.querySelector(".tabs-container");
      if (tabsEl) tabsEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
}

initLoadMore();
initTabs();
