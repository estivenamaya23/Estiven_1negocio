document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && window.location.pathname.endsWith(href)) {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    }
  });

  if (typeof window.quizApp !== 'undefined') {
    window.quizApp.init();
  }
});
