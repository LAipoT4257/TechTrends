// 1. Mobile menu toggle (closes after a link is tapped)
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

// 2. Filter laptops by category
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

// 3. Contact form: check the fields, then open the visitor's email app
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in your name, email and message.";
    formStatus.style.color = "#b3261e";
    return;
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    formStatus.textContent = "Please enter a valid email address.";
    formStatus.style.color = "#b3261e";
    return;
  }

  const subject = encodeURIComponent("Laptop inquiry from the website");
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  formStatus.textContent = `Thanks, ${name}! Opening your email app so you can send this to the shop.`;
  formStatus.style.color = "#2e7d32";
  window.location.href = `mailto:techtrendsgadgetcenter@gmail.com?subject=${subject}&body=${body}`;
  form.reset();
});

// 4. Laptop detail view: "View laptop" shows one laptop's page, "Back" returns
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
    // contact stays visible next to the detail view, so just scroll to it
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

// 5. Photo gallery: click a thumbnail to change the big photo
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
