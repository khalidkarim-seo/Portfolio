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

  window.addEventListener("scroll", handleHeaderShadow);



  /* =========================================================
     2. REVEAL ON SCROLL (IntersectionObserver)
  ========================================================= */

const animatedElements = document.querySelectorAll("[data-animate]");

const observer = new IntersectionObserver((entries) => {

  entries.forEach(entry => {

if (entry.isIntersecting) {

  entry.target.classList.add("show");

  observer.unobserve(entry.target);

}

  });

}, {
  threshold: 0.3
});

animatedElements.forEach(el => observer.observe(el));


/* ======================================
   TIMELINE SCROLL ACTIVATION
====================================== */

const timeline = document.querySelector(".timeline");
const progress = document.querySelector(".progress-line");
const items = document.querySelectorAll(".timeline li");

function updateTimeline(){

if(!timeline || !progress) return;

const rect = timeline.getBoundingClientRect();
const windowHeight = window.innerHeight;
const timelineHeight = timeline.offsetHeight;

const scrollProgress =
(windowHeight - rect.top) / (timelineHeight + windowHeight);

const progressHeight = Math.min(Math.max(scrollProgress,0),1);

progress.style.height = progressHeight * 100 + "%";

/* activate nodes */

const progressPixels = progressHeight * timelineHeight;

items.forEach(item => {

if (progressPixels >= item.offsetTop) {
  item.classList.add("active");
} else {
  item.classList.remove("active");
}

});

}

window.addEventListener("scroll", updateTimeline);
window.addEventListener("load", updateTimeline);

/* =========================================================
   HERO BORDER CURSOR ANIMATION (DESKTOP ONLY)
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
      rgba(255,255,255,0) ${angle}deg 360deg
    )
  `;
}

/* ✅ Toggle function (PRO way) */
function toggleHeroBorderEffect() {
  if (!heroBorder) return;

  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    window.removeEventListener("mousemove", handleHeroBorderAnimation);
    heroBorder.style.background = "none";
  } else {
    window.addEventListener("mousemove", handleHeroBorderAnimation);
  }
}

/* ✅ Run on load */
toggleHeroBorderEffect();

/* ✅ Run on resize */
window.addEventListener("resize", toggleHeroBorderEffect);
  /* =========================================================
     5. MOBILE NAVIGATION (HAMBURGER)
  ========================================================= */

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const body = document.body;

  if (hamburger && navLinks) {

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

  }



  /* =========================================================
     6. CONTACT FORM SUBMISSION + THANK YOU POPUP
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
          body: formData
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

      } 
      catch (error) {
  alert("Something went wrong. Please try again.");
  console.error(error);
}

    });

  }

/* =========================================================
   7. CURSOR GLOW EFFECT
========================================================= */

const glow = document.querySelector(".cursor-glow");

if (glow) {

  document.addEventListener("mousemove", e => {

    glow.style.left = e.clientX - 120 + "px";
    glow.style.top = e.clientY - 120 + "px";

  });

}
/* =========================================================
   WORD BY WORD REVEAL ANIMATION
========================================================= */

const textElements = document.querySelectorAll('[data-animate="words"]');

/* Wrap every word inside span */
textElements.forEach((element) => {

  const words = element.textContent.trim().split(" ");

  element.innerHTML = words
    .map((word, index) => {
      return `
        <span style="transition-delay:${index * 0.08}s">
          ${word}&nbsp;
        </span>
      `;
    })
    .join("");

});


});



