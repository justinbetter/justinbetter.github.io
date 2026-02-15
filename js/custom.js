// Custom JavaScript for HelloJ Blog - Minimal & Clean

(function() {
  'use strict';

  // ===== Reading Progress Bar =====
  function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);
    return progressBar;
  }

  function updateProgressBar(progressBar) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = progress + '%';
  }

  // ===== Back to Top Button =====
  function createBackToTop() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Back to top');
    button.title = 'Back to top';
    
    button.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    document.body.appendChild(button);
    return button;
  }

  function toggleBackToTop(button) {
    if (window.pageYOffset > 300) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }

  // ===== Smooth Scroll for Anchor Links =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ===== Add Hover Effect to Post Items =====
  function initPostItems() {
    const postItems = document.querySelectorAll('.posts-list li, .post-item');
    postItems.forEach(item => {
      item.classList.add('post-item');
    });
  }

  // ===== Initialize Everything =====
  function init() {
    // Create elements
    const progressBar = createProgressBar();
    const backToTopBtn = createBackToTop();

    // Event listeners
    window.addEventListener('scroll', function() {
      updateProgressBar(progressBar);
      toggleBackToTop(backToTopBtn);
    }, { passive: true });

    // Initialize
    initSmoothScroll();
    initPostItems();
    
    // Initial update
    updateProgressBar(progressBar);
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
