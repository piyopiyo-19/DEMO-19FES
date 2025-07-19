// Scripts for the event page

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  setupAosAnimations('[data-aos-f]');
  setupPageTopButton(300);
  document.querySelectorAll('.fade-up').forEach(el => el.classList.remove('show'));
});