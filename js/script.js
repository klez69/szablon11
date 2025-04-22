// Mobile Menu Toggle
const menuBtn = document.getElementById("mobileMenuBtn");
const nav = document.querySelector("nav");

// Otwieranie/zamykanie menu
menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("active");
  nav.classList.toggle("show");
  document.body.style.overflow = nav.classList.contains("show") ? "hidden" : "";
});

// Zamykanie menu po kliknięciu w link
const menuLinks = document.querySelectorAll("#mainMenu a");
menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuBtn.classList.remove("active");
    nav.classList.remove("show");
    document.body.style.overflow = "";
  });
});

// Zamykanie menu po kliknięciu poza menu
document.addEventListener("click", (e) => {
  if (
    nav.classList.contains("show") &&
    !nav.contains(e.target) &&
    !menuBtn.contains(e.target)
  ) {
    menuBtn.classList.remove("active");
    nav.classList.remove("show");
    document.body.style.overflow = "";
  }
});

// Header Scroll Effect
const header = document.querySelector("header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove("scroll-up");
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
    header.classList.remove("scroll-up");
    header.classList.add("scroll-down");
  } else if (
    currentScroll < lastScroll &&
    header.classList.contains("scroll-down")
  ) {
    header.classList.remove("scroll-down");
    header.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      menuBtn.classList.remove("active");
      nav.classList.remove("show");
      document.body.style.overflow = "";
    }
  });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopBtn?.classList.add("visible");
  } else {
    scrollTopBtn?.classList.remove("visible");
  }
});

scrollTopBtn?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Scroll Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("appear");
    }
  });
}, observerOptions);

// Observe elements with fade-up class
document.querySelectorAll(".fade-up, .grid-item").forEach((element) => {
  observer.observe(element);
});

// Stats Counter Animation
const statsSection = document.querySelector(".stats-section");
let hasAnimated = false;

const animateStats = () => {
  if (hasAnimated) return;

  document.querySelectorAll(".stat-number").forEach((stat) => {
    const target = parseInt(stat.getAttribute("data-target") || "0");
    let current = 0;
    const increment = target / 50; // Adjust speed here

    stat.classList.add("counting");

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        stat.textContent = Math.ceil(current).toString();
        requestAnimationFrame(updateCounter);
      } else {
        stat.textContent = target.toString();
        stat.classList.remove("counting");
      }
    };

    updateCounter();
  });

  hasAnimated = true;
};

// Observe stats section
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateStats();
      }
    });
  },
  { threshold: 0.5 }
);

if (statsSection) {
  statsObserver.observe(statsSection);
}

// Form Validation and Animation
const forms = document.querySelectorAll("form");

forms.forEach((form) => {
  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement?.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        input.parentElement?.classList.remove("focused");
      }
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add your form submission logic here
  });
});
