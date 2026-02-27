document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     1. STICKY HEADER SHADOW
  ========================================================= */
  const header = document.querySelector(".header");

  function handleHeaderShadow() {
    if (!header) return;

    header.style.boxShadow =
      window.scrollY > 50
        ? "0 5px 20px rgba(0, 0, 0, 0.5)"
        : "none";
  }


  /* =========================================================
     2. REVEAL ON SCROLL
  ========================================================= */
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
  );

  function handleRevealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    });
  }


  /* =========================================================
     3. HERO BORDER CURSOR ANIMATION
  ========================================================= */
  const heroBorder = document.querySelector(".image-border");

  function handleHeroBorderAnimation(e) {
    if (!heroBorder) return;

    const rect = heroBorder.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 180;

    heroBorder.style.background = `
      conic-gradient(
        white 0deg ${angle}deg,
        rgba(255, 255, 255, 0) ${angle}deg 360deg
      )
    `;
  }


  /* =========================================================
     4. MOBILE NAVIGATION (HAMBURGER)
  ========================================================= */
 const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");
const body = document.body;

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
  body.classList.toggle("nav-open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navLinks.classList.remove("active");
    body.classList.remove("nav-open");
  });
});


  /* =========================================================
     5. CONTACT FORM SUBMISSION + THANK YOU POPUP
  ========================================================= */
  const form = document.querySelector(".contact-form");
  const popup = document.getElementById("thankYouPopup");
  const countdownEl = document.getElementById("countdown");

  if (form && popup && countdownEl) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData(form);

        const response = await fetch(form.action, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Form submission failed");

        popup.classList.add("active");

        let timeLeft = 3;
        countdownEl.textContent = timeLeft;

        const timer = setInterval(() => {
          timeLeft--;
          countdownEl.textContent = timeLeft;

          if (timeLeft <= 0) {
            clearInterval(timer);
            window.location.href = "https://webflowbykhalid.com/";
          }
        }, 1000);

        form.reset();

      } catch (error) {
        console.error("Submission error:", error);
      }
    });
  }


  /* =========================================================
     GLOBAL EVENT LISTENERS
  ========================================================= */

  window.addEventListener("scroll", () => {
    handleHeaderShadow();
    handleRevealOnScroll();
  });

  window.addEventListener("load", handleRevealOnScroll);
  window.addEventListener("mousemove", handleHeroBorderAnimation);

});