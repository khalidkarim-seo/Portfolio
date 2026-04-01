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
  observer.unobserve(entry.target); // stop observing after first reveal
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
     4. HERO BORDER CURSOR ANIMATION
  ========================================================= */
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


/* ================= PREMIUM SLIDER (DRAG ONLY) ================= */

const slides = document.getElementById("slides");
if (!slides) return;
const dotsContainer = document.getElementById("dots");

let slideItems = document.querySelectorAll(".slide");
let index = 1;

/* ===== CLONE ===== */
const firstClone = slideItems[0].cloneNode(true);
const lastClone = slideItems[slideItems.length - 1].cloneNode(true);

slides.appendChild(firstClone);
slides.insertBefore(lastClone, slides.firstChild);

slideItems = document.querySelectorAll(".slide");

/* ===== WIDTH ===== */
function getSlideWidth() {
  const slide = slideItems[0];
  const style = window.getComputedStyle(slide);

  const margin =
    parseFloat(style.marginLeft) +
    parseFloat(style.marginRight);

  return slide.offsetWidth + margin;
}

/* ===== POSITION ===== */
function setPosition(animate = true) {
  const slideWidth = getSlideWidth();
  const containerWidth = slides.parentElement.offsetWidth;

  slides.style.transition = animate ? "transform 0.6s ease" : "none";

  const offset =
    slideWidth * index - (containerWidth / 2 - slideWidth / 2);

  slides.style.transform = `translateX(-${offset}px)`;

  updateClasses();
  updateDots();
}

/* ===== BUTTONS (FIXED - NO DUPLICATE EVENTS) ===== */
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (index >= slideItems.length - 1) return;
    index++;
    setPosition();
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (index <= 0) return;
    index--;
    setPosition();
  });
}

/* ===== CLASSES ===== */
function updateClasses() {
  slideItems.forEach(s =>
    s.classList.remove("active", "prev", "next")
  );

  if (slideItems[index]) {
    slideItems[index].classList.add("active");
    slideItems[index - 1]?.classList.add("prev");
    slideItems[index + 1]?.classList.add("next");
  }
}

/* ===== DOTS ===== */
let dots = [];

if (dotsContainer) {
  dotsContainer.innerHTML = "";

  slideItems.forEach((_, i) => {
    if (i === 0 || i === slideItems.length - 1) return;

    const dot = document.createElement("span");

    dot.addEventListener("click", () => {
      index = i;
      setPosition();
    });

    dotsContainer.appendChild(dot);
  });

  dots = dotsContainer.querySelectorAll("span");
}

function updateDots() {
  if (!dots.length) return;

  dots.forEach(d => d.classList.remove("active"));

  let realIndex = index - 1;

  if (realIndex >= dots.length) realIndex = 0;
  if (realIndex < 0) realIndex = dots.length - 1;

  dots[realIndex]?.classList.add("active");
}

/* ===== LOOP FIX ===== */
slides.addEventListener("transitionend", () => {
  if (!slideItems[index]) return;

  if (slideItems[index].isSameNode(firstClone)) {
    index = 1;
    setPosition(false);
  }

  if (slideItems[index].isSameNode(lastClone)) {
    index = slideItems.length - 2;
    setPosition(false);
  }
});

/* ===== DRAG ===== */
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

/* Disable image drag */
slides.querySelectorAll("img").forEach(img => {
  img.addEventListener("dragstart", e => e.preventDefault());
});

/* Mouse */
slides.addEventListener("mousedown", startDrag);
slides.addEventListener("mousemove", drag);
slides.addEventListener("mouseup", endDrag);
slides.addEventListener("mouseleave", endDrag);

/* Touch */
slides.addEventListener("touchstart", startDrag, { passive: true });
slides.addEventListener("touchmove", drag, { passive: true });
slides.addEventListener("touchend", endDrag);

function startDrag(e) {
  isDragging = true;
  slides.style.transition = "none";

  startX = getX(e);
  prevTranslate = getTranslate();
}

function drag(e) {
  if (!isDragging) return;

  const x = getX(e);
  const diff = x - startX;

  currentTranslate = prevTranslate + diff;
  slides.style.transform = `translateX(${currentTranslate}px)`;
}

function endDrag(e) {
  if (!isDragging) return;
  isDragging = false;

  const movedBy = getX(e) - startX;

  slides.style.transition = "transform 0.5s ease";

  if (movedBy < -50) {
    if (index < slideItems.length - 1) index++;
  } else if (movedBy > 50) {
    if (index > 0) index--;
  }

  setPosition();
}

/* ===== HELPERS ===== */
function getX(e) {
  if (e.type.includes("mouse")) return e.pageX;
  if (e.touches && e.touches[0]) return e.touches[0].clientX;
  if (e.changedTouches && e.changedTouches[0]) return e.changedTouches[0].clientX;
  return 0;
}

function getTranslate() {
  const style = window.getComputedStyle(slides);
  const matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
}

/* ===== INIT ===== */
index = 1;
setPosition(false);

});



