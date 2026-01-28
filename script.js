document.addEventListener("DOMContentLoaded", () => {

  /* ================= SLIDER ================= */
  const track = document.querySelector(".slider-track");
  const leftBtn = document.querySelector(".slider-btn.backward");
  const rightBtn = document.querySelector(".slider-btn.forward");
  const sliderContainer = document.querySelector(".slider-container");

  if (track && leftBtn && rightBtn && sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => {
      track.style.animationPlayState = "paused";
    });

    sliderContainer.addEventListener("mouseleave", () => {
      track.style.animationPlayState = "running";
    });

    leftBtn.addEventListener("click", () => {
      sliderContainer.scrollBy({ left: -300, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
      sliderContainer.scrollBy({ left: 300, behavior: "smooth" });
    });
  }

  /* ================= NAV TOGGLE ================= */
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const indicator = document.querySelector(".indicator");
  const navItems = document.querySelectorAll(".nav-links li");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });

    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("show");
      }
    });
  }

  /* ================= INDICATOR ================= */
  function moveIndicator(item) {
    if (!indicator || !navLinks || !item) return;

    const rect = item.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();

    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${rect.left - navRect.left}px)`;
  }

  const activeItem = document.querySelector(".nav-links li.active") || navItems[0];
  moveIndicator(activeItem);

  navItems.forEach(item => {
    item.addEventListener("mouseenter", () => moveIndicator(item));
    item.addEventListener("mouseleave", () => moveIndicator(activeItem));

    item.addEventListener("click", () => {
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      moveIndicator(item);
    });
  });

  /* ================= SCROLL ANIMATION ================= */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-service-img");
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll(".service-img").forEach(el => observer.observe(el));

  /* ================= CUSTOM CURSOR ================= */
  const cursor = document.querySelector(".custom-cursor");
  if (cursor) {
    document.addEventListener("mousemove", e => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }

  /* ================= CONTACT FORM ================= */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      alert("Thank you! Your message has been sent.");
      contactForm.reset();
    });
  }
});

/* ================= THEME CONTROLLER ================= */
(function themeController() {
  const root = document.documentElement;
  const toggleBtn = document.getElementById("themeToggle");
  if (!toggleBtn) return;

  const STORAGE_KEY = "themePreference";

  function setTheme(theme) {
    if (theme === "day") {
      root.setAttribute("data-theme", "day");
      toggleBtn.textContent = "☀️";
    } else {
      root.removeAttribute("data-theme");
      toggleBtn.textContent = "🌙";
    }
  }

  function getPref() {
    return localStorage.getItem(STORAGE_KEY) || "auto";
  }

  function savePref(p) {
    localStorage.setItem(STORAGE_KEY, p);
  }

  function fallbackByTime() {
    const h = new Date().getHours();
    setTheme(h >= 6 && h < 19 ? "day" : "night");
  }

  toggleBtn.addEventListener("click", () => {
    const isDay = root.hasAttribute("data-theme");
    const next = isDay ? "night" : "day";
    setTheme(next);
    savePref(next);
  });

  const pref = getPref();
  if (pref === "day" || pref === "night") {
    setTheme(pref);
  } else {
    fallbackByTime();
  }
})();
