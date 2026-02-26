// Sticky shadow on scroll
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.5)";
  } else {
    header.style.boxShadow = "none";
  }
});
// ================= REVEAL ON SCROLL =================
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  reveals.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 150; // Distance from bottom of screen

    if (elementTop < windowHeight - revealPoint) {
      el.classList.add('active');
    } else {
      // Remove class when scrolling up
      el.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll); // Reveal elements on load if visible



// ================= HERO IMAGE BORDER curser ANIMATION =================
const heroBorder = document.querySelector('.image-border');

window.addEventListener('mousemove', (e) => {
  const rect = heroBorder.getBoundingClientRect();

  // Get cursor position relative to image center
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const deltaX = e.clientX - centerX;
  const deltaY = e.clientY - centerY;

  // Calculate angle in degrees (0-360)
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 180; // +180 to make 0 at top

  // Animate border up to cursor angle
  heroBorder.style.background = `conic-gradient(
    white 0deg ${angle}deg,
    rgba(255,255,255,0) ${angle}deg 360deg
  )`;
});


const form = document.querySelector(".contact-form");
const popup = document.getElementById("thankYouPopup");
const countdownEl = document.getElementById("countdown");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: formData
  });

  if (response.ok) {
    popup.classList.add("active");

    let timeLeft = 3;
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
});
