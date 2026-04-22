/* =============================
SCROLL REVEAL
=============================*/

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 },
);

document.querySelectorAll(".fade").forEach((el) => observer.observe(el));

/* =============================
NAVBAR SCROLL EFFECT
=============================*/
const nav = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

/* =============================
ACTIVE MENU
=============================*/
const sections = document.querySelectorAll("section");
const navLinksAll = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinksAll.forEach((a) => {
    a.classList.remove("active");

    if (a.getAttribute("href") === "#" + current) {
      a.classList.add("active");
    }
  });
});

/* =============================
MOBILE MENU TOGGLE
=============================*/
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

/* AUTO CLOSE MENU SAAT CLICK LINK (IMPORTANT) */
navLinksAll.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* =============================
PROJECT SLIDER BUTTON
=============================*/

const slider = document.getElementById("slider");

document.getElementById("next").onclick = () => {
  slider.scrollBy({ left: 350, behavior: "smooth" });
};

document.getElementById("prev").onclick = () => {
  slider.scrollBy({ left: -350, behavior: "smooth" });
};

/* =============================
DRAG SLIDER
=============================*/

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => (isDown = false));
slider.addEventListener("mouseup", () => (isDown = false));

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;

  e.preventDefault();

  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;

  slider.scrollLeft = scrollLeft - walk;
});

/* =============================
SLIDER SERTIFIKAT
=============================*/

const certSlider = document.getElementById("cert-slider");
const certPrev = document.getElementById("cert-prev");
const certNext = document.getElementById("cert-next");

certNext.addEventListener("click", () => {
  certSlider.scrollLeft += 350;
});

certPrev.addEventListener("click", () => {
  certSlider.scrollLeft -= 350;
});

/* =============================
SWEETALERT CONTACT ME
=============================*/

const form = document.getElementById("contact-form");
const button = form.querySelector(".btn-submit");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  button.disabled = true;
  button.innerText = "Mengirim...";

  try {
    const formData = new FormData(form);

    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Pesan Terkirim!",
        text: "Terima kasih sudah menghubungi saya",
        background: "#111",
        color: "#fff",
        confirmButtonColor: "#7c6af7",
      });

      form.reset();
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal Mengirim",
        text: "Silakan coba lagi.",
        background: "#111",
        color: "#fff",
      });
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Koneksi bermasalah.",
      background: "#111",
      color: "#fff",
    });
  } finally {
    button.disabled = false;
    button.innerText = "Kirim Pesan →";
  }
});
