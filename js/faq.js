// Scripts for the FAQ & contact page

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  setupAosAnimations('[data-aos-f]');
  setupPageTopButton(300);

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

  document.querySelectorAll('.accordion-faq').forEach(det => {
    const summary = det.querySelector('summary');
    if (!summary) return;

    const toggleIcon = () => {
      summary.classList.toggle('is-open', det.open);
    };

    toggleIcon();
    det.addEventListener('toggle', toggleIcon);
  });
});