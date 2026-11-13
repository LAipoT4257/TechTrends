
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", isOpen);
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    const category = button.dataset.filter;
    cards.forEach((card) => {
      const show = category === "all" || card.dataset.category === category;
      card.classList.toggle("hidden", !show);
    });
  });
});


const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const sendBtn = document.getElementById("sendBtn");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();


  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in your name, email and message.";
    formStatus.className = "error";
    return;
  }


  if (!/^\S+@\S+\.\S+$/.test(email)) {
    formStatus.textContent = "Please enter a valid email address.";
    formStatus.className = "error";
    return;
  }


  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";
  formStatus.textContent = "Sending your message...";
  formStatus.className = "";

  setTimeout(() => {
    formStatus.textContent =
      "✓ Your message has been sent successfully! We will get back to you soon.";
    formStatus.className = "success";
    form.reset();
    sendBtn.disabled = false;
    sendBtn.textContent = "Send message";
  }, 1000);
});


const mainParts = document.querySelectorAll('[data-view="main"]');
const detailParts = document.querySelectorAll('[data-view="detail"]');
let inDetail = false;

function updateView() {
  const id = location.hash.slice(1);
  const detail = id ? document.getElementById(id) : null;

  if (detail && detail.dataset.view === "detail") {
    mainParts.forEach((el) => (el.hidden = true));
    detailParts.forEach((el) => (el.hidden = el !== detail));
    inDetail = true;
    window.scrollTo(0, 0);
  } else if (inDetail && id === "contact") {
    
  } else {
    mainParts.forEach((el) => (el.hidden = false));
    detailParts.forEach((el) => (el.hidden = true));
    const wasDetail = inDetail;
    inDetail = false;
    const target = id ? document.getElementById(id) : null;
    if (target && wasDetail) target.scrollIntoView();
  }
}
window.addEventListener("hashchange", updateView);
updateView();


document.querySelectorAll(".gallery").forEach((gallery) => {
  const main = gallery.querySelector(".gallery-main");
  const thumbs = gallery.querySelectorAll(".thumb");
  thumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      main.src = thumb.dataset.src;
      main.alt = thumb.dataset.alt;
      thumbs.forEach((t) => t.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
});