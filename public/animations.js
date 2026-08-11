// Custom element for hover-tilt effect
class HoverTilt extends HTMLElement {
  connectedCallback() {
    this.style.display = 'block';
    this.addEventListener('mousemove', (e) => {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      const dx = x - xc;
      const dy = y - yc;
      this.style.transform = `perspective(1000px) rotateY(${dx / 30}deg) rotateX(${-dy / 30}deg)`;
    });
    this.addEventListener('mouseleave', () => {
      this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
      this.style.transition = 'transform 0.5s ease-out';
    });
    this.addEventListener('mouseenter', () => {
      this.style.transition = 'none';
    });
  }
}
if (!customElements.get('hover-tilt')) {
  customElements.define('hover-tilt', HoverTilt);
}

// Add simple fade-in animations for scroll
document.addEventListener("DOMContentLoaded", () => {
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

  // Select elements that are hidden by default
  const hiddenElements = document.querySelectorAll('[style*="opacity: 0"]');
  hiddenElements.forEach(el => observer.observe(el));
});


// Carousel fix
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll('img[src*="carousel"]');
  const tracks = new Set();
  images.forEach(img => {
    let container = img.closest('div.flex');
    if (container && container.scrollWidth > 1000) {
      tracks.add(container);
    }
  });
  
  tracks.forEach(track => {
    track.style.transform = 'none'; // clear framer motion inline styles
    track.style.animation = 'marquee 20s linear infinite';
  });
});
