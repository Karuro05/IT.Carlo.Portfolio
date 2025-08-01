// --- Starfield background (improved) ---
const canvas = document.getElementById('starfield');
if (canvas) {
  const ctx = canvas.getContext('2d');
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  let stars = Array.from({length: 120}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.2 + 0.3,
    d: Math.random() * 0.5 + 0.2
  }));
  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.fillStyle = '#fff';
    stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, 2 * Math.PI);
      ctx.fill();
    });
    ctx.restore();
  }
  function animateStars() {
    stars.forEach(star => {
      star.y += star.d;
      if (star.y > canvas.height) {
        star.x = Math.random() * canvas.width;
        star.y = 0;
      }
    });
    drawStars();
    requestAnimationFrame(animateStars);
  }
  animateStars();
}

// --- Typewriter effect (improved) ---
function typewriterEffect(element, text, speed = 60) {
  let i = 0;
  function typing() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }
  element.textContent = '';
  typing();
}
document.addEventListener('DOMContentLoaded', () => {
  const typewriter = document.querySelector('.typewriter');
  if (typewriter) {
    typewriterEffect(typewriter, "Hi, I'm Carlo Ponsica");
  }
});

// --- Dark/Light mode toggle (with icon and persistence) ---
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeToggle.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
setTheme(savedTheme);
themeToggle.addEventListener('click', () => {
  setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// --- Animate on scroll (fade-in) ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.section, .project-card, .timeline-item, .education-list > div, .contact-card').forEach(el => {
  observer.observe(el);
});

// --- CSS for fade-in effect (add to your CSS) ---
// .in-view { opacity: 1; transform: none; transition: opacity 0.8s, transform 0.8s; }
// .section, .project-card, .timeline-item, .education-list > div, .contact-card { opacity: 0; transform: translateY(40px); }

// --- Parallax effect for hero section ---
(function parallaxHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    hero.style.backgroundPosition = `center ${scrollY * 0.4}px`;
    hero.style.transform = `translateY(${scrollY * 0.08}px)`;
  });
})();

// --- Parallax on project cards (subtle) ---
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const moveX = (x - rect.width / 2) * 0.04;
    const moveY = (y - rect.height / 2) * 0.04;
    card.style.transform = `translateY(-8px) scale(1.03) rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// --- More animation: floating social icons ---
document.querySelectorAll('.hero-socials a').forEach((icon, i) => {
  icon.style.transition = 'transform 0.5s cubic-bezier(.4,0,.2,1), color 0.3s';
  icon.animate([
    { transform: 'translateY(0px)' },
    { transform: `translateY(${(i%2===0?1:-1)*8}px)` },
    { transform: 'translateY(0px)' }
  ], {
    duration: 2200 + i*200,
    iterations: Infinity
  });
});

// --- Animate section headers with slide-in ---
document.querySelectorAll('.section h2').forEach(h2 => {
  h2.style.opacity = 0;
  h2.style.transform = 'translateX(-40px)';
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        h2.style.transition = 'opacity 0.7s, transform 0.7s';
        h2.style.opacity = 1;
        h2.style.transform = 'none';
        obs.disconnect();
      }
    });
  }, { threshold: 0.5 });
  obs.observe(h2);
});

// --- Hamburger menu toggle ---
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a, button').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900 && navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }
});
