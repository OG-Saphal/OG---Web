const navToggle = document.getElementById("navToggle");
const mobileMenu = document.getElementById("mobileMenu");
const slides = document.querySelectorAll('.hero-slide');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');
let current = 0;
let timer;

navToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.remove('opacity-0', 'pointer-events-none');
      slide.classList.add('opacity-100');
      // Animate children in
      setTimeout(() => {
        slide.querySelectorAll('img, h1, p, a').forEach((el, idx) => {
          el.classList.remove('opacity-0', 'scale-75', 'translate-y-6');
          el.classList.add('opacity-100');
        });
      }, 50);
    } else {
      slide.classList.add('opacity-0', 'pointer-events-none');
      slide.classList.remove('opacity-100');
      // Reset children animation
      slide.querySelectorAll('img, h1, p, a').forEach((el) => {
        el.classList.add('opacity-0', 'scale-75', 'translate-y-6');
        el.classList.remove('opacity-100');
      });
    }
  });
  current = index;
  clearTimeout(timer);
  timer = setTimeout(() => {
    showSlide((current + 1) % slides.length);
  }, 5000);
}

prevBtn.addEventListener('click', () => {
  showSlide((current - 1 + slides.length) % slides.length);
});
nextBtn.addEventListener('click', () => {
  showSlide((current + 1) % slides.length);
});

// Initialize
showSlide(0);

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true
    });
  }
});

// Swiper initialization for each category
document.addEventListener('DOMContentLoaded', function () {
  new Swiper('.business-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    navigation: { nextEl: '.business-swiper .swiper-button-next', prevEl: '.business-swiper .swiper-button-prev' },
    breakpoints: { 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }
  });
  new Swiper('.menu-swiper', {
    slidesPerView: 2.2,
    spaceBetween: 20,
    navigation: { nextEl: '.menu-swiper .swiper-button-next', prevEl: '.menu-swiper .swiper-button-prev' },
    breakpoints: { 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }
  });
  new Swiper('.flex-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    navigation: { nextEl: '.flex-swiper .swiper-button-next', prevEl: '.flex-swiper .swiper-button-prev' },
    breakpoints: { 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }
  });
  new Swiper('.logo-swiper', {
    slidesPerView: 2.2,
    spaceBetween: 20,
    navigation: { nextEl: '.logo-swiper .swiper-button-next', prevEl: '.logo-swiper .swiper-button-prev' },
    breakpoints: { 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 4.2 } }
  });
  new Swiper('.other-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    navigation: { nextEl: '.other-swiper .swiper-button-next', prevEl: '.other-swiper .swiper-button-prev' },
    breakpoints: { 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }
  });

  // Show full gallery on button click
  // Gallery expand/collapse
  const viewBtn = document.getElementById('viewFullGalleryBtn');
  const lessBtn = document.getElementById('showLessGalleryBtn');
  const gallery = document.getElementById('gallery-content');
  const initialMaxHeight = '1200px';

  if (viewBtn && lessBtn && gallery) {
    viewBtn.addEventListener('click', function () {
      gallery.style.maxHeight = '5000px';
      viewBtn.style.display = 'none';
      lessBtn.style.display = 'inline-block';
    });

    lessBtn.addEventListener('click', function () {
      gallery.style.maxHeight = initialMaxHeight;
      lessBtn.style.display = 'none';
      viewBtn.style.display = 'inline-block';
      gallery.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Hide fade if not scrollable
  document.querySelectorAll('.swiper-fade-mask').forEach(function(maskDiv) {
    const swiperEl = maskDiv.querySelector('.swiper');
    if (!swiperEl) return;
    const swiperInstance = swiperEl.swiper;
    function updateFade() {
      if (!swiperInstance) return;
      let slidesPerView = swiperInstance.params.slidesPerView;
      if (typeof slidesPerView === 'string' && slidesPerView === 'auto') slidesPerView = 1;
      if (swiperInstance.slides.length <= slidesPerView) {
        maskDiv.classList.add('no-fade');
      } else {
        maskDiv.classList.remove('no-fade');
      }
    }
    if (swiperInstance) {
      swiperInstance.on('resize', updateFade);
      swiperInstance.on('init', updateFade);
      updateFade();
    }
  });
});

// Mobile menu: close menu when a nav link is clicked
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenu = document.getElementById('mobileMenu');
  const navToggle = document.getElementById('navToggle');
  // Select all anchor tags inside the mobile menu
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function () {
        // Only hide menu on mobile (screen width <= 768px)
        if (window.innerWidth <= 768) {
          mobileMenu.classList.add('hidden');
          if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
});
