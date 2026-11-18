let siteData;
let activeSection = 'hero';

document.addEventListener('DOMContentLoaded', () => {
  siteData = getSiteData();
  renderSidebar();
  renderSection('hero');
  initSidebarNav();
  initMobileToggle();
});

function initSidebarNav() {
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const section = link.dataset.section;
      activeSection = section;
      document.querySelectorAll('.sidebar-nav a').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      renderSection(section);
      if (window.innerWidth < 769) {
        document.querySelector('.sidebar').classList.remove('open');
      }
    });
  });
}

function initMobileToggle() {
  const btn = document.querySelector('.mobile-toggle');
  const sidebar = document.querySelector('.sidebar');
  if (btn && sidebar) {
    btn.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
}

function renderSidebar() {
  const sections = [
    { id: 'hero', label: 'Hero Section', icon: 'home' },
    { id: 'brand', label: 'Brand / Logo', icon: 'star' },
    { id: 'philosophy', label: 'Teaching Philosophy', icon: 'book' },
    { id: 'subjects', label: 'Subjects', icon: 'grid' },
    { id: 'reviews', label: 'Reviews', icon: 'message' },
    { id: 'cta', label: 'Call to Action', icon: 'megaphone' },
    { id: 'contact', label: 'Contact & Social', icon: 'phone' },
    { id: 'footer', label: 'Footer', icon: 'layout' },
  ];

  const iconMap = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15,8.5 22,9.3 17,14 18.2,21 12,17.8 5.8,21 7,14 2,9.3 9,8.5"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
    message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
    megaphone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>',
    layout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>',
  };

  const nav = document.querySelector('.sidebar-nav');
  nav.innerHTML = sections.map(s =>
    `<li><a href="#" data-section="${s.id}" class="${s.id === 'hero' ? 'active' : ''}">${iconMap[s.icon] || ''}${s.label}</a></li>`
  ).join('');
}

function renderSection(section) {
  const main = document.querySelector('.main-content');
  const renderers = {
    hero: renderHero,
    brand: renderBrand,
    philosophy: renderPhilosophy,
    subjects: renderSubjects,
    reviews: renderReviews,
    cta: renderCTA,
    contact: renderContact,
    footer: renderFooter,
  };

  main.innerHTML = `
    <div class="preview-bar">
      <p>Editing: <strong>${section.charAt(0).toUpperCase() + section.slice(1)}</strong></p>
      <div class="btn-group">
        <a href="index.html" target="_blank" class="btn btn-outline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Preview Site
        </a>
        <button class="btn btn-primary" onclick="saveAll()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Save All
        </button>
      </div>
    </div>
  `;

  const renderer = renderers[section];
  if (renderer) renderer(main);
}

// ── HERO ──
function renderHero(container) {
  const h = siteData.hero;
  container.innerHTML += `
    <div class="page-header"><h2>Hero Section</h2><p>The first thing visitors see — your name, photo, and key stats.</p></div>
    <div class="panel">
      <div class="panel-header"><h3>Personal Info</h3></div>
      <div class="form-row">
        <div class="form-group">
          <label>Full Name</label>
          <input type="text" id="hero-name" value="${esc(h.name)}" onchange="siteData.hero.name=this.value">
        </div>
        <div class="form-group">
          <label>Title / Role</label>
          <input type="text" id="hero-title" value="${esc(h.title)}" onchange="siteData.hero.title=this.value">
        </div>
      </div>
      <div class="form-group">
        <label>Tagline / Motto</label>
        <input type="text" id="hero-tagline" value="${esc(h.tagline)}" onchange="siteData.hero.tagline=this.value">
      </div>
      <div class="form-group">
        <label>Bio</label>
        <textarea id="hero-bio" onchange="siteData.hero.bio=this.value">${esc(h.bio)}</textarea>
      </div>
      <div class="form-group">
        <label>Profile Photo URL</label>
        <input type="url" id="hero-photo" value="${esc(h.photo)}" onchange="siteData.hero.photo=this.value">
        <div class="form-hint">Paste a direct image URL (Unsplash, Imgur, etc.)</div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header"><h3>WhatsApp</h3></div>
      <div class="form-row">
        <div class="form-group">
          <label>WhatsApp Number</label>
          <input type="text" value="${esc(h.whatsappNumber)}" onchange="siteData.hero.whatsappNumber=this.value">
          <div class="form-hint">Country code without +, e.g. 60123456789</div>
        </div>
        <div class="form-group">
          <label>Default Message</label>
          <input type="text" value="${esc(h.whatsappMessage)}" onchange="siteData.hero.whatsappMessage=this.value">
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <h3>Stats</h3>
        <button class="btn btn-sm btn-primary" onclick="addStat()">+ Add Stat</button>
      </div>
      <div class="item-list" id="stats-list"></div>
    </div>
  `;
  renderStatsList();
}

function renderStatsList() {
  const list = document.getElementById('stats-list');
  if (!list) return;
  list.innerHTML = siteData.hero.stats.map((s, i) => `
    <div class="item-card">
      <div class="item-info">
        <div class="item-title">${esc(s.value)} — ${esc(s.label)}</div>
      </div>
      <div class="item-actions">
        <button class="btn btn-sm btn-outline" onclick="editStat(${i})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteStat(${i})">Delete</button>
      </div>
    </div>
  `).join('');
}

function addStat() {
  openModal('Add Stat', [
    { key: 'value', label: 'Value', placeholder: 'e.g. 10+' },
    { key: 'label', label: 'Label', placeholder: 'e.g. Years Experience' },
    { key: 'icon', label: 'Icon (optional)', placeholder: 'star or leave empty' },
  ], {}, data => {
    siteData.hero.stats.push(data);
    renderStatsList();
  });
}

function editStat(i) {
  openModal('Edit Stat', [
    { key: 'value', label: 'Value' },
    { key: 'label', label: 'Label' },
    { key: 'icon', label: 'Icon' },
  ], siteData.hero.stats[i], data => {
    siteData.hero.stats[i] = data;
    renderStatsList();
  });
}

function deleteStat(i) {
  if (confirm('Delete this stat?')) {
    siteData.hero.stats.splice(i, 1);
    renderStatsList();
  }
}

// ── BRAND ──
function renderBrand(container) {
  const b = siteData.brand;
  container.innerHTML += `
    <div class="page-header"><h2>Brand / Logo</h2><p>Your brand name shown in the navigation and footer.</p></div>
    <div class="panel">
      <div class="form-group">
        <label>Logo Text</label>
        <input type="text" value="${esc(b.logoText)}" onchange="siteData.brand.logoText=this.value">
      </div>
    </div>
  `;
}

// ── PHILOSOPHY ──
function renderPhilosophy(container) {
  const p = siteData.philosophy;
  container.innerHTML += `
    <div class="page-header"><h2>Teaching Philosophy</h2><p>Describe how you teach and what makes your approach unique.</p></div>
    <div class="panel">
      <div class="form-row">
        <div class="form-group">
          <label>Section Label</label>
          <input type="text" value="${esc(p.subheading)}" onchange="siteData.philosophy.subheading=this.value">
        </div>
        <div class="form-group">
          <label>Section Heading</label>
          <input type="text" value="${esc(p.heading)}" onchange="siteData.philosophy.heading=this.value">
        </div>
      </div>
      <div class="form-group">
        <label>Philosophy Description</label>
        <textarea rows="4" onchange="siteData.philosophy.description=this.value">${esc(p.description)}</textarea>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header">
        <h3>Teaching Approaches</h3>
        <button class="btn btn-sm btn-primary" onclick="addApproach()">+ Add Approach</button>
      </div>
      <div class="item-list" id="approaches-list"></div>
    </div>
  `;
  renderApproachesList();
}

function renderApproachesList() {
  const list = document.getElementById('approaches-list');
  if (!list) return;
  list.innerHTML = siteData.philosophy.approaches.map((a, i) => `
    <div class="item-card">
      <div class="item-info">
        <div class="item-title">${esc(a.title)}</div>
        <div class="item-subtitle">${esc(a.description).substring(0, 80)}...</div>
      </div>
      <div class="item-actions">
        <button class="btn btn-sm btn-outline" onclick="editApproach(${i})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteApproach(${i})">Delete</button>
      </div>
    </div>
  `).join('');
}

function addApproach() {
  openModal('Add Approach', [
    { key: 'title', label: 'Title', placeholder: 'e.g. Interactive Lessons' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'icon', label: 'Icon', placeholder: 'lightbulb / target / trophy' },
  ], {}, data => {
    siteData.philosophy.approaches.push(data);
    renderApproachesList();
  });
}

function editApproach(i) {
  openModal('Edit Approach', [
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description', type: 'textarea' },
    { key: 'icon', label: 'Icon' },
  ], siteData.philosophy.approaches[i], data => {
    siteData.philosophy.approaches[i] = data;
    renderApproachesList();
  });
}

function deleteApproach(i) {
  if (confirm('Delete this approach?')) {
    siteData.philosophy.approaches.splice(i, 1);
    renderApproachesList();
  }
}

// ── SUBJECTS ──
function renderSubjects(container) {
  container.innerHTML += `
    <div class="page-header"><h2>Subjects</h2><p>Manage the subjects you teach. Each shows as a sticky-note card.</p></div>
    <div class="panel">
      <div class="panel-header">
        <h3>Subject List</h3>
        <button class="btn btn-sm btn-primary" onclick="addSubject()">+ Add Subject</button>
      </div>
      <div class="item-list" id="subjects-list"></div>
    </div>
  `;
  renderSubjectsList();
}

function renderSubjectsList() {
  const list = document.getElementById('subjects-list');
  if (!list) return;
  list.innerHTML = siteData.subjects.map((s, i) => `
    <div class="item-card">
      <div class="color-preview" style="background:${s.color}"></div>
      <div class="item-info">
        <div class="item-title">${esc(s.name)}</div>
        <div class="item-subtitle">${esc(s.levels)}</div>
      </div>
      <div class="item-actions">
        <button class="btn btn-sm btn-outline" onclick="editSubject(${i})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteSubject(${i})">Delete</button>
      </div>
    </div>
  `).join('');
}

function addSubject() {
  openModal('Add Subject', [
    { key: 'name', label: 'Subject Name', placeholder: 'e.g. Chemistry' },
    { key: 'levels', label: 'Levels', placeholder: 'e.g. IGCSE, SPM' },
    { key: 'icon', label: 'Icon', placeholder: 'calculator / flask / book-open / globe' },
    { key: 'color', label: 'Card Color', type: 'color', value: '#FFE082' },
  ], {}, data => {
    siteData.subjects.push(data);
    renderSubjectsList();
  });
}

function editSubject(i) {
  openModal('Edit Subject', [
    { key: 'name', label: 'Subject Name' },
    { key: 'levels', label: 'Levels' },
    { key: 'icon', label: 'Icon' },
    { key: 'color', label: 'Card Color', type: 'color' },
  ], siteData.subjects[i], data => {
    siteData.subjects[i] = data;
    renderSubjectsList();
  });
}

function deleteSubject(i) {
  if (confirm('Delete this subject?')) {
    siteData.subjects.splice(i, 1);
    renderSubjectsList();
  }
}

// ── REVIEWS ──
function renderReviews(container) {
  container.innerHTML += `
    <div class="page-header"><h2>Reviews</h2><p>Student and parent testimonials shown in the carousel.</p></div>
    <div class="panel">
      <div class="panel-header">
        <h3>Testimonials</h3>
        <button class="btn btn-sm btn-primary" onclick="addReview()">+ Add Review</button>
      </div>
      <div class="item-list" id="reviews-list"></div>
    </div>
  `;
  renderReviewsList();
}

function renderReviewsList() {
  const list = document.getElementById('reviews-list');
  if (!list) return;
  list.innerHTML = siteData.reviews.map((r, i) => `
    <div class="item-card">
      <div class="item-info">
        <div class="item-title">${esc(r.name)} — ${esc(r.detail)}</div>
        <div class="item-subtitle">"${esc(r.quote).substring(0, 70)}..."</div>
      </div>
      <div class="item-actions">
        <button class="btn btn-sm btn-outline" onclick="editReview(${i})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteReview(${i})">Delete</button>
      </div>
    </div>
  `).join('');
}

function addReview() {
  openModal('Add Review', [
    { key: 'name', label: 'Name', placeholder: 'e.g. Sarah' },
    { key: 'detail', label: 'Detail', placeholder: 'e.g. Grade 10, Parent' },
    { key: 'quote', label: 'Quote', type: 'textarea', placeholder: 'Their testimonial...' },
  ], {}, data => {
    siteData.reviews.push(data);
    renderReviewsList();
  });
}

function editReview(i) {
  openModal('Edit Review', [
    { key: 'name', label: 'Name' },
    { key: 'detail', label: 'Detail' },
    { key: 'quote', label: 'Quote', type: 'textarea' },
  ], siteData.reviews[i], data => {
    siteData.reviews[i] = data;
    renderReviewsList();
  });
}

function deleteReview(i) {
  if (confirm('Delete this review?')) {
    siteData.reviews.splice(i, 1);
    renderReviewsList();
  }
}

// ── CTA ──
function renderCTA(container) {
  const c = siteData.cta;
  container.innerHTML += `
    <div class="page-header"><h2>Call to Action</h2><p>The final push for visitors to get in touch.</p></div>
    <div class="panel">
      <div class="form-group">
        <label>Heading</label>
        <input type="text" value="${esc(c.heading)}" onchange="siteData.cta.heading=this.value">
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea onchange="siteData.cta.description=this.value">${esc(c.description)}</textarea>
      </div>
      <div class="form-group">
        <label>Button Text</label>
        <input type="text" value="${esc(c.buttonText)}" onchange="siteData.cta.buttonText=this.value">
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>WhatsApp Number</label>
          <input type="text" value="${esc(c.whatsappNumber)}" onchange="siteData.cta.whatsappNumber=this.value">
        </div>
        <div class="form-group">
          <label>Default Message</label>
          <input type="text" value="${esc(c.whatsappMessage)}" onchange="siteData.cta.whatsappMessage=this.value">
        </div>
      </div>
    </div>
  `;
}

// ── CONTACT ──
function renderContact(container) {
  const c = siteData.contact;
  container.innerHTML += `
    <div class="page-header"><h2>Contact & Social</h2><p>Your contact details and social media links.</p></div>
    <div class="panel">
      <div class="panel-header"><h3>Contact Details</h3></div>
      <div class="form-row">
        <div class="form-group">
          <label>Email</label>
          <input type="email" value="${esc(c.email)}" onchange="siteData.contact.email=this.value">
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input type="text" value="${esc(c.phone)}" onchange="siteData.contact.phone=this.value">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>WhatsApp Number</label>
          <input type="text" value="${esc(c.whatsapp)}" onchange="siteData.contact.whatsapp=this.value">
        </div>
        <div class="form-group">
          <label>Location</label>
          <input type="text" value="${esc(c.location)}" onchange="siteData.contact.location=this.value">
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-header"><h3>Social Media</h3></div>
      <div class="form-row">
        <div class="form-group">
          <label>Instagram URL</label>
          <input type="url" value="${esc(c.social.instagram)}" onchange="siteData.contact.social.instagram=this.value">
        </div>
        <div class="form-group">
          <label>Facebook URL</label>
          <input type="url" value="${esc(c.social.facebook)}" onchange="siteData.contact.social.facebook=this.value">
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>TikTok URL</label>
          <input type="url" value="${esc(c.social.tiktok || '')}" onchange="siteData.contact.social.tiktok=this.value">
        </div>
        <div class="form-group">
          <label>LinkedIn URL</label>
          <input type="url" value="${esc(c.social.linkedin || '')}" onchange="siteData.contact.social.linkedin=this.value">
        </div>
      </div>
      <div class="form-group">
        <label>YouTube URL</label>
        <input type="url" value="${esc(c.social.youtube || '')}" onchange="siteData.contact.social.youtube=this.value">
      </div>
    </div>
  `;
}

// ── FOOTER ──
function renderFooter(container) {
  const f = siteData.footer;
  container.innerHTML += `
    <div class="page-header"><h2>Footer</h2><p>Copyright text and year.</p></div>
    <div class="panel">
      <div class="form-row">
        <div class="form-group">
          <label>Copyright Name</label>
          <input type="text" value="${esc(f.copyright)}" onchange="siteData.footer.copyright=this.value">
        </div>
        <div class="form-group">
          <label>Year</label>
          <input type="text" value="${esc(f.year)}" onchange="siteData.footer.year=this.value">
        </div>
      </div>
    </div>
  `;
}

// ── MODAL ──
function openModal(title, fields, data, onSave) {
  const existing = document.querySelector('.modal-overlay');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <h3>${title}</h3>
      ${fields.map(f => `
        <div class="form-group">
          <label>${f.label}</label>
          ${f.type === 'textarea'
            ? `<textarea id="modal-${f.key}" placeholder="${f.placeholder || ''}">${esc(data[f.key] || '')}</textarea>`
            : f.type === 'color'
              ? `<input type="color" id="modal-${f.key}" value="${esc(data[f.key] || f.value || '#ffffff')}">`
              : `<input type="text" id="modal-${f.key}" value="${esc(data[f.key] || '')}" placeholder="${f.placeholder || ''}">`
          }
        </div>
      `).join('')}
      <div class="modal-actions">
        <button class="btn btn-outline" onclick="closeModal()">Cancel</button>
        <button class="btn btn-primary" id="modal-save">Save</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('open'));

  overlay.querySelector('#modal-save').addEventListener('click', () => {
    const result = {};
    fields.forEach(f => {
      result[f.key] = document.getElementById(`modal-${f.key}`).value;
    });
    onSave(result);
    closeModal();
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
}

function closeModal() {
  const overlay = document.querySelector('.modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    setTimeout(() => overlay.remove(), 200);
  }
}

// ── SAVE / RESET / EXPORT ──
function saveAll() {
  if (saveSiteData(siteData)) {
    showToast('All changes saved!');
  } else {
    showToast('Failed to save.', true);
  }
}

function resetAll() {
  if (confirm('Reset all content to defaults? This cannot be undone.')) {
    resetSiteData();
    siteData = getSiteData();
    renderSection(activeSection);
    showToast('Reset to defaults.');
  }
}

function exportAll() {
  exportData();
  showToast('Data exported as JSON.');
}

function importData() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        siteData = data;
        saveSiteData(siteData);
        renderSection(activeSection);
        showToast('Data imported successfully!');
      } catch (err) {
        showToast('Invalid JSON file.', true);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

// ── TOAST ──
function showToast(msg, isError) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast${isError ? ' error' : ''}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── UTILS ──
function esc(str) {
  if (str == null) return '';
  const d = document.createElement('div');
  d.textContent = String(str);
  return d.innerHTML;
}
