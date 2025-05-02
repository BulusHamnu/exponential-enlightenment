
// var
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const themeToggle = document.getElementById('theme-toggle');
const themeMenu = document.getElementById('theme-menu');
const themeOptions = document.querySelectorAll('.theme-option');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const newsletterForm = document.getElementById('newsletter-form');
const scrollElements = document.querySelectorAll('.animate-on-scroll');
const overlayBlock = document.querySelector(".overlay-block")


// Mobile Menu Toggle
if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    mainNav.classList.toggle('show');
    overlayBlock.classList.toggle('show');
  });

  overlayBlock.addEventListener("click", () => {
    mobileMenuToggle.classList.toggle('active')
    mainNav.classList.toggle('show');
    overlayBlock.classList.toggle('show');
  })
}

// Theme Switcher
themeToggle.addEventListener('click', function(e) {
  e.stopPropagation();
  themeMenu.classList.toggle('show');
});

// Close theme menu when clicking outside
document.addEventListener('click', function(e) {
  if (!themeToggle.contains(e.target)) {
    themeMenu.classList.remove('show');
  }
});

// Theme Options
themeOptions.forEach(option => {
  option.addEventListener('click', function() {
    const theme = this.getAttribute('data-theme');
    document.body.className = ''; // Remove all classes
    document.body.classList.add(`theme-${theme}`);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
    
    // Update active state on buttons
    themeOptions.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    
    // Close theme menu
    themeMenu.classList.remove('show');
  });
});

// Load saved theme from localStorage
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme') || 'default';
  document.body.classList.add(`theme-${savedTheme}`);
  
  // Update active state on theme button
  themeOptions.forEach(option => {
    if (option.getAttribute('data-theme') === savedTheme) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });
});


// Testimonial Carousel
const container = document.querySelector(".testimonial-container");
if(container) {
  const nodes = Array.from(container.children);

nodes.forEach(node => {
  const clone = node.cloneNode(true); 
  container.appendChild(clone); 
});

const carousels = document.querySelectorAll(".testimonial-carousel")
carousels.forEach( carousel => {

  carousel.addEventListener("mouseenter", () => carousels.forEach( c => c.style.animationPlayState = "paused" ));
  carousel.addEventListener("mouseleave", () => carousels.forEach( c => c.style.animationPlayState = "running" ));
  

})
}



// Contact Form
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const formUrl = this.getAttribute('action');
    
    fetch(formUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        
        formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    })
    .catch(error => {
      formStatus.textContent = 'There was an error sending your message. Please try again.';
      formStatus.className = 'form-status error';
    });
  });
}

// Newsletter Form
if (newsletterForm) {
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    
    if (emailInput.value) {
      // In a real app, you would send this to your newsletter API
      alert('Thank you for subscribing to our newsletter!');
      this.reset();
    }
  });
}

// Scroll Animations
function checkScrollElements() {
  const triggerBottom = window.innerHeight * 0.85;
  
  scrollElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    
    if (elementTop < triggerBottom) {
      el.classList.add('show');
    }
  });
}

// Check elements on scroll
window.addEventListener('scroll', checkScrollElements);
// Check on initial load
window.addEventListener('load', checkScrollElements);
