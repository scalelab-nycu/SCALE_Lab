// ── Inject shared header & footer ──────────────────────────
const HEADER_HTML = `
<div class="container nav">
  <div class="brand">
    <a href="index.html" aria-label="Go to home" class="brand-logo-link">
      <img src="assets/images/logo.svg" alt="SCALE Lab Logo" class="logo">
      <span class="brand-full-name"><span>Sustainable Circuits and Architectures</span><span>for Layered Eco-chips (SCALE) Lab</span></span>
    </a>
  </div>
  <nav>
    <button class="hamburger" aria-label="Open navigation menu" id="menuBtn">☰</button>
    <ul id="menu">
      <li><a data-page="research" href="research.html">Research</a></li>
      <li><a data-page="advisor" href="advisor.html">Advisor</a></li>
      <li><a data-page="people" href="people.html">Member</a></li>
      <li><a data-page="publication" href="publication.html">Publication</a></li>
      <li><a data-page="course" href="course.html">Course</a></li>
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

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');

menuBtn?.addEventListener('click', () => {
  menu?.classList.toggle('open');
});

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
  const res = await fetch('assets/site-data.json', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to load site-data.json');
  return await res.json();
}

window.loadSiteData = loadSiteData;

// Publication page updates from latest publication list
if (document.body.dataset.page === 'publication') {
  const latestConferencePapers = [
    'T.-W. Yang, W. Lu, Y.-Y. Huang, P. Su, and P.-T. Huang, “Energy-Efficient All-Digital Computation-in Memory Macro Design with CFeFET-based Booth Decoder,” IEEE International Symposium on Circuits and Systems (ISCAS), 2026.',
    'H.-J. Hsu, H.-C. Lee, C.-Y. Shen, P.-T. Huang, S.-C. Lin, Y.-J. Wang, Y.-Y. Chen, C.-Y. Pao, H.-Y. Lee and C.-T. Chao, “Defect-based Testing for SRAM Address Decoders,” IEEE VLSI Test Symposium (VTS), 2026.',
    'Y.-C. Nian, W. Lu and P.-T. Huang, “Non-Linear Tunable RO-based Time-to-Digital Converter for FeFET-based Computation-in-Memory Macro,” IEEE International VLSI Symposium on Technology, Systems and Applications, 2026.'
  ];

  const conferenceSection = Array.from(document.querySelectorAll('.publication-section'))
    .find(section => section.querySelector('.section-header')?.textContent.trim() === 'Conference Papers');

  const conferenceList = conferenceSection?.querySelector('.pub-list');
  if (conferenceList && !conferenceList.textContent.includes('CFeFET-based Booth Decoder')) {
    latestConferencePapers.slice().reverse().forEach(paper => {
      const li = document.createElement('li');
      li.textContent = paper;
      conferenceList.prepend(li);
    });
  }
}

// Member page display normalization
if (document.body.dataset.page === 'people') {
  let normalizeAttempts = 0;
  const normalizeTimer = setInterval(() => {
    document.querySelectorAll('.td-position').forEach(cell => {
      cell.textContent = cell.textContent
        .replaceAll('TSMC(台積電)', 'DTP/TSMC (Design Technology Platform/台積電)')
        .replaceAll('TSMC DTP', 'DTP/TSMC (Design Technology Platform/台積電)')
        .replaceAll('NVDIA', 'NVIDIA');
    });

    document.querySelectorAll('#alumni-tbody tr').forEach(row => {
      const nameCell = row.querySelector('.td-name');
      const thesisCell = row.querySelector('.td-thesis');
      const em = thesisCell?.querySelector('em');
      if (!nameCell || !thesisCell || !em) return;

      const name = nameCell.textContent.trim();
      const title = em.textContent.trim();

      if (name.includes('吳易真') || title === 'Energy-Efficient Accelerator with Relative-Indexing Memory for Sparse Compressed CNN' || title === 'An Energy-Efficient Accelerator with Relative-Indexing Memory for Sparse Compressed CNN') {
        if (thesisCell.firstChild) thesisCell.firstChild.textContent = '應用於壓縮卷積神經網路之具能源效益加速器設計';
        em.textContent = 'An Energy-Efficient Accelerator with Relative-Indexing Memory for Sparse Compressed Convolutional Neural Network';
      }

      if (name.includes('楊子鋐') || title === 'Resource-Constrained Design Exploration of CNN for Edge Computing Inferences') {
        if (thesisCell.firstChild) thesisCell.firstChild.textContent = '應用於終端卷積神經網路之資源限制設計方法探討';
        em.textContent = 'Resource-Constrained Design Exploration of Convolutional Neural Network for Edge Computing Inferences';
      }
    });

    normalizeAttempts += 1;
    if (normalizeAttempts >= 100) {
      clearInterval(normalizeTimer);
    }
  }, 50);
}
