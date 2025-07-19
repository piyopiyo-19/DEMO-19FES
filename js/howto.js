// Scripts for the participation guide page

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  setupAosAnimations('[data-aos-f]');
  setupPageTopButton(100);
  showTab('circle');
  document.querySelectorAll('.fade-up').forEach(el => el.classList.remove('show'));
  setupDemoVideo();
});

window.addEventListener('load', () => {
  fadeImage(document.getElementById('circle-image'));
});

function setupDemoVideo() {
  const video = document.getElementById('demo-video');
  if (!video) return;
  video.muted = true;
  video.playsInline = true;
  video.loop = true;
  video.controls = false; // hide default controls on iOS

  const enableControls = () => {
    video.controls = true;
  };
  video.addEventListener('touchstart', enableControls, { once: true });
  video.addEventListener('click', enableControls, { once: true });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(video);
  } else {
    video.autoplay = true;
    video.play();
  }
}