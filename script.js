const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");

document.getElementById("year").textContent = new Date().getFullYear();
document.body.classList.add("loaded");

navToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

const updateHeaderState = () => {
  header.classList.toggle("scrolled", window.scrollY > 8);
};

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

const revealItems = document.querySelectorAll(
  ".section-kicker, .split-heading, .expertise-grid article, .skill-cloud span, .project-card, .timeline article, .resume-panel, .contact-layout > *"
);

revealItems.forEach((item, index) => {
  item.classList.add("reveal");
  item.style.setProperty("--reveal-order", String(index % 6));
});

const revealVisibleItems = () => {
  const triggerLine = window.innerHeight * 0.9;

  revealItems.forEach((item) => {
    if (item.classList.contains("is-visible")) {
      return;
    }

    const itemTop = item.getBoundingClientRect().top;
    if (itemTop < triggerLine) {
      item.classList.add("is-visible");
    }
  });
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

revealVisibleItems();
window.addEventListener("scroll", revealVisibleItems, { passive: true });
window.addEventListener("resize", revealVisibleItems);
