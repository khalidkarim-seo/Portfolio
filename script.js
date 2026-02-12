// =====================
// SCRIPT — CLEAN VERSION (FIXED)
// =====================

document.addEventListener("DOMContentLoaded", () => {

  /* ================= Slider ================= */

  const track = document.querySelector(".slider-track");
  const leftBtn = document.querySelector(".slider-btn.backward");
  const rightBtn = document.querySelector(".slider-btn.forward");
  const sliderContainer = document.querySelector(".slider-container");

  if (track && leftBtn && rightBtn && sliderContainer) {

    track.addEventListener("mouseenter", () => {
      track.style.animationPlayState = "paused";
    });

    track.addEventListener("mouseleave", () => {
      track.style.animationPlayState = "running";
    });

    const getScrollAmount = () =>
      Math.min(320, sliderContainer.clientWidth * 0.8);

    leftBtn.addEventListener("click", () => {
      sliderContainer.scrollBy({
        left: -getScrollAmount(),
        behavior: "smooth",
      });
    });

    rightBtn.addEventListener("click", () => {
      sliderContainer.scrollBy({
        left: getScrollAmount(),
        behavior: "smooth",
      });
    });
  }


  /* ================= Mobile Nav ================= */

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {

    const navAnchors = navLinks.querySelectorAll("a");

    const openMenu = () => {
      navLinks.classList.add("active");
      hamburger.classList.add("active");
      hamburger.setAttribute("aria-expanded", "true");
    };

    const closeMenu = () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      hamburger.setAttribute("aria-expanded", "false");
    };

    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      navLinks.classList.contains("active") ? closeMenu() : openMenu();
    });

    navAnchors.forEach(link =>
      link.addEventListener("click", closeMenu)
    );

    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }


  /* ================= Nav Indicator ================= */

  const indicator = document.querySelector(".indicator");
  const navItems = document.querySelectorAll(".nav-links li");

  function moveIndicator(el) {
    if (!indicator || !navLinks || !el) return;

    const rect = el.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();

    indicator.style.width = rect.width + "px";
    indicator.style.transform =
      `translateX(${rect.left - navRect.left}px)`;
  }

  if (indicator && navItems.length) {

    const setActive = (item) => {
      document.querySelector(".nav-links li.active")
        ?.classList.remove("active");
      item.classList.add("active");
      moveIndicator(item);
    };

    const initial =
      document.querySelector(".nav-links li.active") || navItems[0];
    setActive(initial);

    navItems.forEach(item => {
      item.addEventListener("mouseenter", () => moveIndicator(item));
      item.addEventListener("click", () => setActive(item));
    });

    navLinks.addEventListener("mouseleave", () => {
      moveIndicator(
        document.querySelector(".nav-links li.active")
      );
    });

    window.addEventListener("resize", () => {
      moveIndicator(
        document.querySelector(".nav-links li.active")
      );
    });
  }


  /* ================= Scroll Animations ================= */

  const serviceImgs = document.querySelectorAll(".service-img");

  if ("IntersectionObserver" in window && serviceImgs.length) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-service-img");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    serviceImgs.forEach(el => observer.observe(el));
  } else {
    serviceImgs.forEach(el =>
      el.classList.add("animate-service-img")
    );
  }


  /* ================= Custom Cursor ================= */

  const cursor = document.querySelector(".custom-cursor");

  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }


  /* ================= Contact Form ================= */

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! Your message has been sent.");
      contactForm.reset();
    });
  }


  /* ================= Theme Mode (FIXED & MERGED) ================= */

 /* ================= Theme Mode (DAY / NIGHT) ================= */

  const THEME_KEY = "theme";

  let toggleBtn = document.getElementById("themeToggle");

  // Create toggle button if not exists
  if (!toggleBtn) {
    toggleBtn = document.createElement("button");
    toggleBtn.id = "themeToggle";
    toggleBtn.className = "theme-toggle";
    toggleBtn.setAttribute("aria-label", "Toggle Day Night Mode");
    toggleBtn.innerText = "☀️";
    document.body.appendChild(toggleBtn);
  }

  function setTheme(theme) {
    if (theme === "day") {
      document.body.classList.add("day-mode");
      toggleBtn.innerText = "🌙";
    } else {
      document.body.classList.remove("day-mode");
      toggleBtn.innerText = "☀️";
    }
    localStorage.setItem(THEME_KEY, theme);
  }

  function getAutoTheme() {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "night";
    }

    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? "day" : "night";
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  setTheme(savedTheme || getAutoTheme());

  toggleBtn.addEventListener("click", () => {
    const current = document.body.classList.contains("day-mode")
      ? "day"
      : "night";

    setTheme(current === "day" ? "night" : "day");
  });

  // Auto switch if system theme changes (only if user didn’t choose manually)
  if (!savedTheme && window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        setTheme(e.matches ? "night" : "day");
      });
  }


  /* ================= Smooth Anchor Scroll ================= */

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

});
/* ================= Preloader ================= */

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  if (!preloader) return;

  preloader.classList.add("hide");

  // Optional: remove from DOM completely (recommended)
  setTimeout(() => {
    preloader.remove();
  }, 600); // match CSS transition
});

/* ================= Reading Progress ================= */

const progressBar = document.getElementById("progressBar");

if (progressBar) {

  function updateProgress() {

    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop;

    const docHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = progress + "%";
  }

  window.addEventListener("scroll", updateProgress);
  window.addEventListener("load", updateProgress);
  window.addEventListener("resize", updateProgress);
}
