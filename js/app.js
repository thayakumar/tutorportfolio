document.addEventListener('DOMContentLoaded', () => {
  const data = getSiteData();
  renderPage(data);
  initNav();
  initReviewCarousel();
});

function renderPage(d) {
  // Brand
  setText('.nav-logo-text', d.brand.logoText);
  setText('.footer-brand', d.brand.logoText);

  // Hero
  setText('.hero-name', d.hero.name);
  setText('.hero-greeting', `Meet Your Next Tutor,`);
  setText('.hero-tagline', d.hero.tagline);
  setText('.hero-bio', d.hero.bio);

  const heroImg = document.querySelector('.hero-photo img');
  if (heroImg && d.hero.photo) {
    heroImg.src = d.hero.photo;
    heroImg.alt = `Photo of ${d.hero.name}`;
  }

  // Stats
  const statsContainer = document.querySelector('.hero-stats');
  if (statsContainer) {
    statsContainer.innerHTML = d.hero.stats.map(s => `
      <div class="stat-card">
        <div class="stat-value">${s.icon === 'star' ? s.value + '<span class="star"> ★</span>' : s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    `).join('');
  }

  // WhatsApp links
  const waUrl = getWhatsAppUrl(d.hero.whatsappNumber, d.hero.whatsappMessage);
  document.querySelectorAll('.wa-link').forEach(el => el.href = waUrl);
  const ctaWaUrl = getWhatsAppUrl(d.cta.whatsappNumber, d.cta.whatsappMessage);
  document.querySelectorAll('.wa-cta-link').forEach(el => el.href = ctaWaUrl);

  // Philosophy
  setText('.philosophy-label', d.philosophy.subheading);
  setText('.philosophy-title', d.philosophy.heading);
  setText('.philosophy-desc', d.philosophy.description);

  const approachContainer = document.querySelector('.philosophy-cards');
  if (approachContainer) {
    approachContainer.innerHTML = d.philosophy.approaches.map(a => `
      <div class="approach-card">
        <h3>
          <span class="approach-icon">${getIcon(a.icon)}</span>
          ${esc(a.title)}
        </h3>
        <p>${esc(a.description)}</p>
      </div>
    `).join('');
  }

  // Subjects
  const subjectsContainer = document.querySelector('.subjects-grid');
  if (subjectsContainer) {
    subjectsContainer.innerHTML = d.subjects.map(s => `
      <div class="subject-card" style="background:${s.color || '#fff9c4'}">
        <span class="subject-icon">${getSubjectEmoji(s.icon)}</span>
        <h3>${esc(s.name)}</h3>
        <span class="levels">${esc(s.levels)}</span>
      </div>
    `).join('');
  }

  // Reviews
  const reviewsContainer = document.querySelector('.reviews-track');
  if (reviewsContainer) {
    reviewsContainer.innerHTML = d.reviews.map(r => `
      <div class="review-card">
        <div class="review-quote">
          <p>${esc(r.quote)}</p>
        </div>
        <div class="review-author">
          <div class="review-avatar">${r.name.charAt(0)}</div>
          <div>
            <div class="review-name">${esc(r.name)}</div>
            <div class="review-detail">${esc(r.detail)}</div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // CTA
  setText('.cta-heading', d.cta.heading);
  setText('.cta-desc', d.cta.description);
  setText('.cta-btn-text', d.cta.buttonText);

  // Contact / Footer
  const emailLink = document.querySelector('.contact-email');
  if (emailLink) {
    emailLink.href = `mailto:${d.contact.email}`;
    emailLink.textContent = d.contact.email;
  }

  const phoneLink = document.querySelector('.contact-phone');
  if (phoneLink) {
    phoneLink.href = `tel:${d.contact.phone.replace(/\s/g, '')}`;
    phoneLink.textContent = d.contact.phone;
  }

  setText('.contact-location', d.contact.location);
  setText('.footer-copyright-text', `© ${d.footer.year} ${d.footer.copyright}. All rights reserved.`);
  setText('.footer-desc', d.hero.bio);

  // Social links
  const socialContainer = document.querySelector('.footer-social');
  if (socialContainer) {
    let html = '';
    if (d.contact.social.instagram) html += socialLink('instagram', d.contact.social.instagram);
    if (d.contact.social.facebook) html += socialLink('facebook', d.contact.social.facebook);
    if (d.contact.social.tiktok) html += socialLink('tiktok', d.contact.social.tiktok);
    if (d.contact.social.linkedin) html += socialLink('linkedin', d.contact.social.linkedin);
    if (d.contact.social.youtube) html += socialLink('youtube', d.contact.social.youtube);
    socialContainer.innerHTML = html;
  }

  // Floating WA
  const floatWa = document.querySelector('.whatsapp-float');
  if (floatWa) floatWa.href = waUrl;
}

function initNav() {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (toggle) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const isOpen = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
      toggle.innerHTML = isOpen
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      });
    });
  }
}

function initReviewCarousel() {
  const track = document.querySelector('.reviews-track');
  const prevBtn = document.querySelector('.review-prev');
  const nextBtn = document.querySelector('.review-next');
  if (!track || !prevBtn || !nextBtn) return;

  let idx = 0;
  const cards = track.querySelectorAll('.review-card');
  const total = cards.length;

  function getCardWidth() {
    if (!cards[0]) return 340;
    const style = getComputedStyle(track);
    const gap = parseInt(style.gap) || 24;
    return cards[0].offsetWidth + gap;
  }

  function getVisible() {
    const w = track.parentElement.offsetWidth;
    return Math.floor(w / getCardWidth()) || 1;
  }

  function slide() {
    const maxIdx = Math.max(0, total - getVisible());
    idx = Math.max(0, Math.min(idx, maxIdx));
    track.style.transform = `translateX(-${idx * getCardWidth()}px)`;
    updateDots();
  }

  function updateDots() {
    const dots = document.querySelectorAll('.review-dot');
    dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
  }

  prevBtn.addEventListener('click', () => { idx--; slide(); });
  nextBtn.addEventListener('click', () => { idx++; slide(); });

  const dotsContainer = document.querySelector('.review-dots');
  if (dotsContainer) {
    dotsContainer.innerHTML = Array.from({ length: total }, (_, i) =>
      `<button class="review-dot${i === 0 ? ' active' : ''}" aria-label="Go to review ${i + 1}"></button>`
    ).join('');
    dotsContainer.querySelectorAll('.review-dot').forEach((dot, i) => {
      dot.addEventListener('click', () => { idx = i; slide(); });
    });
  }

  window.addEventListener('resize', slide);
}

function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
}

function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function getIcon(name) {
  const icons = {
    lightbulb: '<svg viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2"><path d="M9 21h6M12 3a6 6 0 014 10.5V17H8v-3.5A6 6 0 0112 3z"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2"><path d="M8 21h8m-4-4v4M6 4h12v2a6 6 0 11-12 0V4zm0 0H4v3a3 3 0 003 3h1M18 4h2v3a3 3 0 01-3 3h-1"/></svg>',
  };
  return icons[name] || icons.lightbulb;
}

function getSubjectEmoji(icon) {
  const map = {
    calculator: '🧮',
    flask: '🔬',
    'book-open': '📖',
    'square-root': '📐',
    globe: '🌍',
    computer: '💻',
    music: '🎵',
    art: '🎨',
    language: '🗣️',
    history: '📜',
  };
  return map[icon] || '📚';
}

function socialLink(platform, url) {
  const icons = {
    instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  };
  return `<a href="${url}" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="${platform}">${icons[platform] || ''}</a>`;
}
