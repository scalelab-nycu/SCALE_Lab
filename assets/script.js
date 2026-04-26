
// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
menuBtn?.addEventListener('click', () => menu.classList.toggle('open'));
// ── Inject shared header & footer ──────────────────────────
const HEADER_HTML = `
<div class="container nav">
  <div class="brand">
    <img src="assets/images/logo.svg" alt="SCALE Lab Logo" class="logo">
    <a href="index.html" aria-label="Go to home">SCALE Lab</a>
  </div>
  <nav>
    <button class="hamburger" aria-label="Open navigation menu" id="menuBtn">☰</button>
    <ul id="menu">
      <li><a data-page="research" href="research.html">Research</a></li>
      <li><a data-page="advisor" href="advisor.html">Advisor</a></li>
      <li><a data-page="publication" href="publication.html">Publication</a></li>
      <li><a data-page="people" href="people.html">People</a></li>
      <li><a data-page="contact" href="contact.html">Contact</a></li>
    </ul>
  </nav>
</div>`;

const FOOTER_HTML = `
<div class="container" style="padding: 20px 0; border-top: 1px solid var(--border); color: var(--muted);">
  © <span id="yearNow"></span> Sustainable Circuits and Architectures for Layered Eco-chips Lab.
</div>`;

const headerEl = document.querySelector('header');
if (headerEl) headerEl.innerHTML = HEADER_HTML;

const footerEl = document.querySelector('footer');
if (footerEl) footerEl.innerHTML = FOOTER_HTML;
// ────────────────────────────────────────────────────────────

// 以下保留原本的程式碼...
// Active nav by data-page
const page = document.body.dataset.page;
if (page) {
  const link = document.querySelector(`nav a[data-page="${page}"]`);
  link?.classList.add('active');
}

// Footer year
const y = document.getElementById('yearNow');
if (y) y.textContent = new Date().getFullYear();

// Smooth scroll
document.documentElement.style.scrollBehavior = 'smooth';

// Fetch site data
async function loadSiteData() {
  const res = await fetch('assets/site-data.json', {cache: 'no-store'});
  if (!res.ok) throw new Error('Failed to load site-data.json');
  return await res.json();
}
window.loadSiteData = loadSiteData;
