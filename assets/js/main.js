// Shahed Home Renovation - Main JavaScript
// Pure Vanilla JavaScript - No jQuery, No Frameworks
// JavaScript handles ONLY behavior - no content generation

// ============================================
// CLASS 1: NAVIGATION
// ============================================
class Navigation {
  constructor() {
    this.nav = document.getElementById('nav');
    this.hamburger = document.getElementById('hamburger');
    this.mobileMenu = document.getElementById('mobile-menu');
    this.navLinks = document.querySelectorAll('.nav__link');
    
    if (!this.nav) return;
    
    this.init();
  }

  init() {
    // Scroll detection - add shadow after 80px
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        this.nav.classList.add('nav--scrolled');
      } else {
        this.nav.classList.remove('nav--scrolled');
      }
    });

    // Hamburger menu toggle
    if (this.hamburger && this.mobileMenu) {
      this.hamburger.addEventListener('click', () => {
        this.mobileMenu.classList.toggle('nav__mobile-menu--open');
      });

      // Close button handler
      const mobileClose = document.getElementById('mobile-close');
      if (mobileClose) {
        mobileClose.addEventListener('click', () => {
          this.mobileMenu.classList.remove('nav__mobile-menu--open');
        });
      }

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!this.mobileMenu.contains(e.target) && !this.hamburger.contains(e.target)) {
          this.mobileMenu.classList.remove('nav__mobile-menu--open');
        }
      });

      // Close menu when clicking a link
      const mobileLinks = this.mobileMenu.querySelectorAll('a');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          this.mobileMenu.classList.remove('nav__mobile-menu--open');
        });
      });
    }

    // Active page detection
    this.setActivePage();
  }

  setActivePage() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    this.navLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPage || 
          (currentPage === '' && linkPath === 'index.html') ||
          (currentPage === '/' && linkPath === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
}

// ============================================
// CLASS 2: HERO SLIDESHOW
// ============================================
class HeroSlideshow {
  constructor() {
    this.slidesContainer = document.getElementById('hero-slides');
    if (!this.slidesContainer) return;
    
    this.slides = document.querySelectorAll('.hero__slide');
    this.dots = document.querySelectorAll('.hero__dot');
    this.currentSlide = 0;
    this.slideInterval = null;
    this.isPaused = false;
    this.touchStartX = 0;
    this.touchEndX = 0;
    
    this.init();
  }

  init() {
    // Auto-advance every 6 seconds
    this.startAutoPlay();

    // Dot navigation
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });
    });

    // Pause on hover
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      heroSection.addEventListener('mouseenter', () => {
        this.isPaused = true;
      });

      heroSection.addEventListener('mouseleave', () => {
        this.isPaused = false;
      });
    }

    // Touch swipe support
    this.slidesContainer.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    });

    this.slidesContainer.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    });
  }

  goToSlide(index) {
    // Remove active class from current slide and dot
    this.slides[this.currentSlide].classList.remove('active');
    this.dots[this.currentSlide].classList.remove('active');

    // Set new current slide
    this.currentSlide = index;

    // Add active class to new slide and dot
    this.slides[this.currentSlide].classList.add('active');
    this.dots[this.currentSlide].classList.add('active');
  }

  nextSlide() {
    if (this.isPaused) return;
    
    const next = (this.currentSlide + 1) % this.slides.length;
    this.goToSlide(next);
  }

  prevSlide() {
    const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.goToSlide(prev);
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next slide
        this.nextSlide();
      } else {
        // Swipe right - previous slide
        this.prevSlide();
      }
      this.resetAutoPlay();
    }
  }

  startAutoPlay() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 6000);
  }

  resetAutoPlay() {
    clearInterval(this.slideInterval);
    this.startAutoPlay();
  }
}

// ============================================
// CLASS 3: SCROLL ANIMATIONS
// ============================================
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.scroll-animate');
    if (this.elements.length === 0) return;
    
    this.init();
  }

  init() {
    // IntersectionObserver for scroll animations
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Optional: unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    }, options);

    this.elements.forEach(element => {
      // If element is already visible in viewport on page load, show it immediately
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        element.classList.add('visible');
      } else {
        observer.observe(element);
      }
    });
  }
}

// ============================================
// CLASS 4: LIGHTBOX
// ============================================
class Lightbox {
  constructor() {
    this.galleryItems = document.querySelectorAll('.gallery__item, .featured__item');
    if (this.galleryItems.length === 0) return;
    
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.lightboxClose = document.getElementById('lightbox-close');
    this.lightboxBackdrop = document.getElementById('lightbox-backdrop');
    
    if (!this.lightbox) this.createLightbox();
    
    this.init();
  }

  createLightbox() {
    // Create lightbox if it doesn't exist
    const lightboxHTML = `
      <div class="lightbox" id="lightbox">
        <div class="lightbox__backdrop" id="lightbox-backdrop"></div>
        <div class="lightbox__content">
          <button class="lightbox__close" id="lightbox-close"><i class="fas fa-times"></i></button>
          <img src="" alt="" class="lightbox__img" id="lightbox-img">
          <p class="lightbox__caption" id="lightbox-caption"></p>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImg = document.getElementById('lightbox-img');
    this.lightboxCaption = document.getElementById('lightbox-caption');
    this.lightboxClose = document.getElementById('lightbox-close');
    this.lightboxBackdrop = document.getElementById('lightbox-backdrop');
  }

  init() {
    // Click on gallery item to open lightbox
    this.galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const src = item.getAttribute('data-src');
        const caption = item.getAttribute('data-caption') || '';
        this.open(src, caption);
      });
    });

    // Close lightbox
    if (this.lightboxClose) {
      this.lightboxClose.addEventListener('click', () => this.close());
    }

    if (this.lightboxBackdrop) {
      this.lightboxBackdrop.addEventListener('click', () => this.close());
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
        this.close();
      }
    });
  }

  open(src, caption) {
    this.lightboxImg.src = src;
    this.lightboxImg.alt = caption;
    this.lightboxCaption.textContent = caption;
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
  }

  close() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore body scroll
  }
}

// ============================================
// CLASS 5: FORM HANDLER
// ============================================
class FormHandler {
  constructor() {
    this.form = document.getElementById('contact-form');
    if (!this.form) return;
    
    this.submitButton = document.getElementById('form-submit');
    this.messageDiv = document.getElementById('form-message');
    
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  async handleSubmit() {
    // Get form data
    const formData = new FormData(this.form);
    
    // Show loading state
    this.submitButton.disabled = true;
    this.submitButton.textContent = 'Sending...';
    this.messageDiv.className = 'form__message';
    this.messageDiv.textContent = '';

    try {
      // Submit to Formspree
      const response = await fetch(this.form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Success
        this.showMessage('success', 'Thanks! Shahed will contact you within 24 hours.');
        this.form.reset();
      } else {
        // Error
        this.showMessage('error', 'Something went wrong. Please call us directly at 416-575-8791.');
      }
    } catch (error) {
      // Network error
      this.showMessage('error', 'Something went wrong. Please call us directly at 416-575-8791.');
    } finally {
      // Reset button
      this.submitButton.disabled = false;
      this.submitButton.textContent = 'Send Message & Get Free Estimate';
    }
  }

  showMessage(type, message) {
    this.messageDiv.className = `form__message ${type}`;
    this.messageDiv.textContent = message;
  }
}

// ============================================
// INITIALIZE ALL CLASSES ON DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
  new HeroSlideshow();
  new ScrollAnimations();
  new Lightbox();
  new FormHandler();
});