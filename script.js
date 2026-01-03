document.documentElement.classList.add("js");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
if (navToggle && navLinks) {
  const closeNav = () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("is-open")) {
        closeNav();
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) {
      closeNav();
    }
  });
}

const fab = document.querySelector(".fab");
if (fab) {
  const toggle = fab.querySelector(".fab-toggle");
  const menu = fab.querySelector(".fab-menu");

  const closeFab = () => {
    fab.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = fab.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  menu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    if (fab.classList.contains("is-open")) {
      closeFab();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeFab();
    }
  });
}

const params = new URLSearchParams(window.location.search);
if (params.get("success") === "true") {
  const successMessage = document.querySelector(".form-success");
  if (successMessage) {
    successMessage.hidden = false;
  }

  const contactSection = document.getElementById("contact");
  if (contactSection) {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    contactSection.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth" });
  }
}
