// Modified animations.js
document.addEventListener("DOMContentLoaded", () => {
  // Apply hover-tilt effect to elements with data-tilt-factor
  const tiltElements = document.querySelectorAll('[data-tilt-factor]');
  tiltElements.forEach(el => {
    el.style.display = 'block';
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const dx = x - xc;
      const dy = y - yc;
      el.style.transform = `perspective(1000px) rotateY(${dx / 30}deg) rotateX(${-dy / 30}deg)`;
    
  // Sticky Navbar Scroll Effect
  const header = document.getElementById('site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('bg-white/80', 'backdrop-blur-md', 'border-border-divider');
        header.classList.remove('bg-transparent', 'border-transparent');
      } else {
        header.classList.remove('bg-white/80', 'backdrop-blur-md', 'border-border-divider');
        header.classList.add('bg-transparent', 'border-transparent');
      }
    });
  }
});

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
      el.style.transition = 'transform 0.5s ease-out';
    });
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'none';
    });
  });

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 1s ease, transform 1s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const hiddenElements = document.querySelectorAll('[style*="opacity: 0"]');
  hiddenElements.forEach(el => observer.observe(el));

  // Carousel fix
  const images = document.querySelectorAll('img[src*="carousel"]');
  const tracks = new Set();
  images.forEach(img => {
    let container = img.closest('div.flex');
    if (container && container.scrollWidth > 1000) {
      tracks.add(container);
    }
  });
  
  tracks.forEach(track => {
    track.style.transform = 'none';
    track.style.animation = 'marquee 20s linear infinite';
  });
});
