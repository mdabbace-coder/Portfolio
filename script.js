const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const themeToggle = document.querySelector(".theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const modal = document.querySelector(".project-modal");
const modalTitle = document.getElementById("modal-title");
const modalSummary = document.getElementById("modal-summary");
const modalValue = document.getElementById("modal-value");
const modalTools = document.getElementById("modal-tools");

document.getElementById("year").textContent = new Date().getFullYear();
document.body.classList.add("loaded");

const projectDetails = {
  "Adaptive Quiz System for WGU": {
    summary:
      "A structured learning workflow that organizes question flow, captures responses, and prepares progress data for reporting.",
    value:
      "Useful for education teams that need cleaner learner tracking, repeatable quiz structure, and easier review of performance patterns.",
    tools: "Google Sheets, Google Forms, Apps Script, automation logic",
  },
  "Excel & Google Sheets P&L Automation": {
    summary:
      "A finance reporting workflow built around Excel, pivots, advanced formulas, Google Sheets, and cleaner month-end structure.",
    value:
      "Reduces repetitive manual spreadsheet work and gives accounts teams a clearer view of P&L, reconciliations, and finance summaries.",
    tools: "Excel, Pivot Tables, Google Sheets, Apps Script, QuickBooks",
  },
  "Project Tracking Dashboard": {
    summary:
      "A project operations dashboard for status, ownership, deadlines, and priority tracking across active work.",
    value:
      "Helps managers see delays, ownership gaps, and operational pressure points before they become larger problems.",
    tools: "Power BI, Excel, Google Sheets, process design",
  },
  "Smart Client Management System": {
    summary:
      "A lightweight CRM-style workflow for client intake, records, follow-ups, and delivery checkpoints.",
    value:
      "Turns scattered client information into a more reliable operating system for service delivery and follow-up management.",
    tools: "Google Forms, Google Sites, CRM structure, automation",
  },
  "GHL + n8n AI Workflow": {
    summary:
      "An AI-assisted workflow concept connecting leads, routing, automated actions, and business notifications.",
    value:
      "Improves response speed and reduces manual handoff by connecting lead data, AI support, and workflow automation.",
    tools: "GoHighLevel, n8n, AI automation, API workflows",
  },
  "Power BI Reporting Systems": {
    summary:
      "Reporting systems that transform operational and finance data into readable dashboards and performance views.",
    value:
      "Supports better decision-making through KPI structure, Excel cleanup, light SQL logic, and executive-ready reporting.",
    tools: "Excel, Power BI, data modeling, SQL fundamentals",
  },
};

const themePreferenceKey = "portfolio-theme-v2";
localStorage.removeItem("portfolio-theme");

const savedTheme = localStorage.getItem(themePreferenceKey);
if (savedTheme === "light") {
  document.body.removeAttribute("data-theme");
} else {
  document.body.dataset.theme = "dark";
}

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

themeToggle?.addEventListener("click", () => {
  const isDark = document.body.dataset.theme === "dark";
  if (isDark) {
    document.body.removeAttribute("data-theme");
    localStorage.setItem(themePreferenceKey, "light");
  } else {
    document.body.dataset.theme = "dark";
    localStorage.setItem(themePreferenceKey, "dark");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const categories = card.dataset.category || "";
      const shouldShow = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-filtered", !shouldShow);
    });
  });
});

const closeModal = () => {
  modal.hidden = true;
  document.body.classList.remove("modal-open");
};

document.querySelectorAll(".project-detail").forEach((button) => {
  button.addEventListener("click", () => {
    const detail = projectDetails[button.dataset.project];
    if (!detail) {
      return;
    }

    modalTitle.textContent = button.dataset.project;
    modalSummary.textContent = detail.summary;
    modalValue.textContent = detail.value;
    modalTools.textContent = detail.tools;
    modal.hidden = false;
    document.body.classList.add("modal-open");
  });
});

document.querySelectorAll("[data-modal-close]").forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) {
    closeModal();
  }
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
