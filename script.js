// =====================
// SCRIPT — CLEAN VERSION
// =====================

document.addEventListener("DOMContentLoaded", () => {

  /* ================= Slider ================= */

  const track = document.querySelector(".slider-track");
  const leftBtn = document.querySelector(".slider-btn.backward");
  const rightBtn = document.querySelector(".slider-btn.forward");
  const sliderContainer = document.querySelector(".slider-container");

  if (track && leftBtn && rightBtn && sliderContainer) {

    // pause on hover
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
    navLinks.classList.add("active");   // FIXED
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");
  };

  const closeMenu = () => {
    navLinks.classList.remove("active"); // FIXED
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    navLinks.classList.contains("active") ? closeMenu() : openMenu();
  };

  hamburger.addEventListener("click", toggleMenu);

  navAnchors.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

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


  /* ================= Theme Mode ================= */

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");

  function applyTheme(isDark) {
    document.body.classList.toggle("dark", isDark);
  }

  // priority: saved > system
  if (savedTheme) {
    applyTheme(savedTheme === "dark");
  } else {
    applyTheme(prefersDark.matches);
  }

  // system change listener
  const mediaListener = (e) => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches);
    }
  };

  if (prefersDark.addEventListener) {
    prefersDark.addEventListener("change", mediaListener);
  } else {
    prefersDark.addListener(mediaListener); // old safari
  }

  // manual toggle
  const themeToggle = document.getElementById("themeToggle");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = !document.body.classList.contains("dark");
      applyTheme(isDark);
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

});


/* ================= Preloader ================= */

window.addEventListener("load", () => {
  document
    .getElementById("preloader")
    ?.classList.add("hide");
});

/* ================= id smoth click scroliing ================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');

    if (targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  });
});
