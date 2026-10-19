document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('biTheme') || 'light';

  function applyTheme(theme) {
    document.body.dataset.theme = theme;
    const isDark = theme === 'dark';

    if (themeToggle) {
      themeToggle.innerHTML = `<i class="bi ${isDark ? 'bi-sun-fill' : 'bi-moon-stars-fill'}" aria-hidden="true"></i><span>Tema ${isDark ? 'claro' : 'oscuro'}</span>`;
      themeToggle.setAttribute('aria-label', `Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`);
    }

    if (window.Chart) {
      window.Chart.defaults.color = isDark ? '#d5dfec' : '#666';
      window.Chart.defaults.borderColor = isDark ? '#3a4b61' : '#dee2e6';
      document.querySelectorAll('canvas').forEach((canvas) => {
        window.Chart.getChart(canvas)?.update();
      });
    }
  }

  applyTheme(savedTheme);
  themeToggle?.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('biTheme', nextTheme);
    applyTheme(nextTheme);
  });

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
