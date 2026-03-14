const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const mainNav = document.querySelector(".main-nav");
const themeToggle = document.getElementById("theme-toggle");
const themeMenu = document.getElementById("theme-menu");
const themeOptions = document.querySelectorAll(".theme-option");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const scrollElements = document.querySelectorAll(".animate-on-scroll");
const overlayBlock = document.querySelector(".overlay-block");

/* Mobile Menu Toggle */
if (mobileMenuToggle) {
  function toogleMobileNavBar() {
    mobileMenuToggle.classList.toggle("active");
    mainNav.classList.toggle("show");
    overlayBlock.classList.toggle("show");
  }

  mobileMenuToggle.addEventListener("click", () => toogleMobileNavBar());
  overlayBlock.addEventListener("click", () => toogleMobileNavBar());

  const navLinks = mainNav.querySelectorAll("li");
  navLinks.forEach((navLink) =>
    navLink.addEventListener("click", () => {
      if (mainNav.classList.contains("show")) toogleMobileNavBar();
    }),
  );
}

/* Theme Switcher */
themeToggle.addEventListener("click", function (e) {
  e.stopPropagation();
  themeMenu.classList.toggle("show");
});

/* Close theme menu when clicking outside */
document.addEventListener("click", function (e) {
  if (!themeToggle.contains(e.target)) {
    themeMenu.classList.remove("show");
  }
});

/* Theme Options */
themeOptions.forEach((option) => {
  option.addEventListener("click", function () {
    const theme = this.getAttribute("data-theme");
    document.body.className = "";
    document.body.classList.add(`theme-${theme}`);

    localStorage.setItem("theme", theme);

    themeOptions.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    themeMenu.classList.remove("show");
  });
});

/* Load saved theme from localStorage */
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme") || "default";
  document.body.classList.add(`theme-${savedTheme}`);

  themeOptions.forEach((option) => {
    if (option.getAttribute("data-theme") === savedTheme) {
      option.classList.add("active");
    } else {
      option.classList.remove("active");
    }
  });
});

/* Testimonial Carousel */
const container = document.querySelector(".testimonial-container");
if (container) {
  const nodes = Array.from(container.children);

  nodes.forEach((node) => {
    const clone = node.cloneNode(true);
    container.appendChild(clone);
  });

  const carousels = document.querySelectorAll(".testimonial-carousel");
  carousels.forEach((carousel) => {
    carousel.addEventListener("mouseenter", () =>
      carousels.forEach((c) => (c.style.animationPlayState = "paused")),
    );
    carousel.addEventListener("mouseleave", () =>
      carousels.forEach((c) => (c.style.animationPlayState = "running")),
    );
  });
}

/* Contact Form */
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const formUrl = this.getAttribute("action");

    fetch(formUrl, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          formStatus.textContent =
            "Message sent successfully! I'll get back to you soon.";
          formStatus.className = "form-status success";
          contactForm.reset();
        } else {
          throw new Error("Form submission failed");
        }
      })
      .catch((error) => {
        formStatus.textContent =
          "There was an error sending your message. Please try again.";
        formStatus.className = "form-status error";

        console.error("Error:", error);
      });
  });
}

/* Scroll Animations */
const observer2 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  },
);

scrollElements.forEach((element) => {
  observer2.observe(element);
});

/* Home section observer for links highlighting */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const elementId = entry.target.getAttribute("id");
        const navLinks = document.querySelectorAll(".main-nav li a");

        navLinks.forEach((link) => {
          const K = link.getAttribute(`href`).split("#")[1];
          if (K !== elementId) {
            link.classList.remove("active");
            return;
          }
          link.classList.add("active");
        });
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  },
);

const homeSections = document.querySelectorAll(".home-section");
homeSections.forEach((element) => {
  observer.observe(element);
});
