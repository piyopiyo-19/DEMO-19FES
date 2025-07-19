

// Initialization for the top page

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  setupAosAnimations('[data-aos]', { rootMargin: '0px 0px -250px 0px' });
  setupPageTopButton(300);

  function initCarousel(container) {
    const carousel = container.querySelector('.carousel');
    if (!carousel) return;
    const items = carousel.querySelectorAll('.item');
    const leftBtn = container.querySelector('.carousel-button.left');
    const rightBtn = container.querySelector('.carousel-button.right');
    const dotsContainer = container.nextElementSibling && container.nextElementSibling.classList.contains('dots')
      ? container.nextElementSibling
      : container.querySelector('.dots');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.dot') : [];
    const itemCount = items.length - 2;

    function getItemWidth() {
      const gap = parseInt(getComputedStyle(carousel).gap);
      return items[0].getBoundingClientRect().width + gap;
    }

    let currentIndex = 1;
    let scrollTimeout;

    function updateDots(index) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }

    function updateActiveItem() {
      items.forEach((item, i) => {
        item.classList.toggle('active', i === currentIndex);
      });
    }

      function slideTo(index, smooth = true) {
        if (!smooth) carousel.style.scrollBehavior = 'auto';
        const width = getItemWidth();
        const offset = (carousel.clientWidth - items[0].clientWidth) / 2;
        carousel.scrollTo({ left: width * index - offset, behavior: smooth ? 'smooth' : 'auto' });
      currentIndex = index;
      updateDots((index - 1 + itemCount) % itemCount);
      updateActiveItem();
      if (!smooth) {
        requestAnimationFrame(() => { carousel.style.scrollBehavior = 'smooth'; });
      }
    }

    function checkLoop() {
      if (currentIndex === 0) {
        currentIndex = itemCount;
        slideTo(currentIndex, false);
      } else if (currentIndex === itemCount + 1) {
        currentIndex = 1;
        slideTo(currentIndex, false);
      }
    }

      carousel.addEventListener('scroll', () => {
        const width = getItemWidth();
        const offset = (carousel.clientWidth - items[0].clientWidth) / 2;
        const index = Math.round((carousel.scrollLeft + offset) / width);
      if (index !== currentIndex) {
        currentIndex = index;
        updateDots((currentIndex - 1 + itemCount) % itemCount);
        updateActiveItem();
      }
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(checkLoop, 60);
    });

    leftBtn && leftBtn.addEventListener('click', () => slideTo(currentIndex - 1));
    rightBtn && rightBtn.addEventListener('click', () => slideTo(currentIndex + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => slideTo(i + 1)));
    window.addEventListener('resize', () => slideTo(currentIndex, false));
    window.addEventListener('load', () => {
      slideTo(currentIndex, false);
      updateActiveItem();
      const interval = parseInt(container.dataset.interval) || 5000;
      setInterval(() => slideTo(currentIndex + 1), interval);
    });
  }

  document.querySelectorAll('.cal-container').forEach(initCarousel);

  // zoom + fade for icons
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('animate-in');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.slide-icon-button').forEach(el => {
    observer.observe(el);
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('animate-in');
    }
  });
});

// logo animations and loader hide after load
window.addEventListener('load', () => {
  const logo = document.querySelector('.top-logo');
  const main2 = document.querySelector('.top-main2');
  const subLogo = document.querySelector('.top-logo-ske');
  const loader = document.getElementById('page-loader');

  setTimeout(() => logo && logo.classList.add('visible'), 30);
  setTimeout(() => main2 && main2.classList.add('visible'), 200);
  setTimeout(() => subLogo && subLogo.classList.add('visible'), 1800);

  if (loader) {
    loader.classList.add('hide');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 400);
  }
});