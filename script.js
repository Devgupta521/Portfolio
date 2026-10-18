
/* =========================================
   G. DEVENDRA — PORTFOLIO INTERACTIONS
   ========================================= */

// MOBILE NAVIGATION
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label",
      isOpen ? "Close navigation" : "Toggle navigation");

    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Toggle navigation");
      menuToggle.textContent = "☰";
    });
  });
}

// ANIMATED HERO HEADLINE
const typedText = document.getElementById("typed-text");

const words = [
  "Cybersecurity",
  "Ethical Hacking",
  "Network Security",
  "Security Research",
  "Digital Investigations"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeHeadline() {
  if (!typedText) return;

  const currentWord = words[wordIndex];

  if (deleting) {
    characterIndex--;
  } else {
    characterIndex++;
  }

  typedText.textContent = currentWord.substring(0, characterIndex);

  let delay = deleting ? 45 : 85;

  if (!deleting && characterIndex === currentWord.length) {
    deleting = true;
    delay = 1400;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 350;
  }

  window.setTimeout(typeHeadline, delay);
}

if (typedText) {
  typeHeadline();
}

// SCROLL REVEAL ANIMATIONS
const revealElements = document.querySelectorAll(
  ".section-heading, .about-main, .detail-card, " +
  ".focus-card, .skill-group, .timeline-item, " +
  ".project-card, .achievement-card, .leadership-card, " +
  ".goal-item, .contact-content, .contact-terminal"
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

// ACTIVE NAVIGATION LINKS
const pageSections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(
  '.nav-links a[href^="#"]'
);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const sectionId = entry.target.id;

        navigationLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === `#${sectionId}`;

          link.classList.toggle("active", isActive);

          if (isActive) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    },
    {
      rootMargin: "-25% 0px -60% 0px"
    }
  );

  pageSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}

// AUTOMATIC COPYRIGHT YEAR
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
