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
