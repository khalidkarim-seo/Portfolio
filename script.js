// script.js

document.addEventListener("DOMContentLoaded", () => {
  // -------------------- Slider Functionality --------------------
  const track = document.querySelector(".slider-track");
  const leftBtn = document.querySelector(".slider-btn.backward");
  const rightBtn = document.querySelector(".slider-btn.forward");
  const sliderContainer = document.querySelector(".slider-container");

  if (track && leftBtn && rightBtn && sliderContainer) {
    // Pause auto-scroll on hover
    track.addEventListener("mouseenter", () => {
      track.style.animationPlayState = "paused";
    });

    track.addEventListener("mouseleave", () => {
      track.style.animationPlayState = "running";
    });

    // Manual navigation
    leftBtn.addEventListener("click", () => {
      sliderContainer.scrollBy({ left: -300, behavior: "smooth" });
    });

    rightBtn.addEventListener("click", () => {
      sliderContainer.scrollBy({ left: 300, behavior: "smooth" });
    });
  }

  // -------------------- Hamburger & Nav Toggle --------------------
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");
  const indicator = document.querySelector(".indicator");
  const navItems = document.querySelectorAll(".nav-links li");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    // Close menu on link click (for mobile)
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });

    // Close menu if clicked outside
    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove("show");
      }
    });
  }

  // -------------------- Active Indicator --------------------
  function moveIndicator(element) {
    if (!indicator || !navLinks) return;
    const rect = element.getBoundingClientRect();
    const navRect = navLinks.getBoundingClientRect();
    indicator.style.width = `${rect.width}px`;
    indicator.style.transform = `translateX(${rect.left - navRect.left}px)`;
  }

  // Set initial position to the active link
  const activeItem = document.querySelector(".nav-links li.active a");
  if (activeItem) moveIndicator(activeItem.parentElement);

  // Hover and Click events for indicator
  navItems.forEach((item) => {
    item.addEventListener("mouseenter", () => moveIndicator(item));
    item.addEventListener("mouseleave", () => {
      const active = document.querySelector(".nav-links li.active");
      if (active) moveIndicator(active);
    });

    item.addEventListener("click", () => {
      document.querySelector(".nav-links li.active")?.classList.remove("active");
      item.classList.add("active");
      moveIndicator(item);
    });
  });

  // -------------------- Scroll Animations --------------------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-service-img");
      }
    });
  });

  document.querySelectorAll(".service-img").forEach((el) => observer.observe(el));
  
 // Custom Cursor
const cursor = document.querySelector(".custom-cursor");
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
 

  // -------------------- Contact Form --------------------
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you! Your message has been sent.");
      this.reset();
    });
  }
});
