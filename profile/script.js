// Interactive JavaScript for Bhanu Govardhan Portfolio

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initGcpArchitecture();
  initSkillsFilter();
  initCopyEmail();
  initContactForm();
  initMobileNav();
  initActiveScroll();
  setCurrentYear();
});

// 1. Theme Toggle (Dark / Light)
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const htmlEl = document.documentElement;

  // Saved theme preference
  const savedTheme = localStorage.getItem('bg_theme') || 'dark';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlEl.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('bg_theme', newTheme);
  });

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (theme === 'light') {
      themeIcon.className = 'fa-solid fa-sun';
      themeIcon.style.color = '#f59e0b';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeIcon.style.color = '#06b6d4';
    }
  }
}

// 2. Interactive GCP Pipeline Architecture Stage Switcher
function initGcpArchitecture() {
  const stages = document.querySelectorAll('.pipeline-stage');
  const titleEl = document.getElementById('stageDetailTitle');
  const textEl = document.getElementById('stageDetailText');
  const iconEl = document.getElementById('stageDetailIcon');

  const stageData = {
    ingestion: {
      title: '1. Ingestion Phase: Multi-Source Data Ingestion',
      icon: '<i class="fa-solid fa-database" style="color: var(--accent-cyan);"></i>',
      text: 'Ingesting high-volume datasets from legacy on-prem systems (Teradata, Hadoop) and real-time streaming sources (Adobe Analytics) into Google Cloud Storage (GCS) landed bucket areas. Implemented schema enforcement and data validation before compute triggering.'
    },
    orchestration: {
      title: '2. Orchestration & DevOps: Cloud Composer & Tekton',
      icon: '<i class="fa-solid fa-diagram-project" style="color: #3b82f6;"></i>',
      text: 'Apache Airflow (Cloud Composer) manages dependency-rich DAGs, task retries, and strict SLA monitoring. Automated CI/CD pipelines via Tekton and Docker streamline code validation, Spark submit tasks, and production deployments.'
    },
    processing: {
      title: '3. Compute & Processing: PySpark on Dataproc',
      icon: '<i class="fa-solid fa-bolt" style="color: #f59e0b;"></i>',
      text: 'Utilizing ephemeral Dataproc clusters powered by PySpark to process multi-terabyte datasets. Engineered custom algorithms for Change Data Capture (CDC) and Slowly Changing Dimensions (SCD Type 2), reducing processing latency by 40%+.'
    },
    lakehouse: {
      title: '4. Lakehouse & Storage: BigQuery & GCS',
      icon: '<i class="fa-solid fa-layer-group" style="color: #10b981;"></i>',
      text: 'Modern Cloud Lakehouse architecture on BigQuery with partitioned & clustered table strategies. Reduced cloud infrastructure spend by 25% by tuning Spark shuffle partitions and file sizes in GCS.'
    },
    serving: {
      title: '5. Serving & Governance: Power BI & Data Observability',
      icon: '<i class="fa-solid fa-chart-column" style="color: #ec4899;"></i>',
      text: 'Exposing curated data models to enterprise Power BI dashboards for executive decision-making. Enforced automated Python/SQL data quality checks for zero-drift governance and full data lineage compliance.'
    }
  };

  stages.forEach(stage => {
    stage.addEventListener('click', () => {
      stages.forEach(s => s.classList.remove('active'));
      stage.classList.add('active');

      const stageKey = stage.getAttribute('data-stage');
      const data = stageData[stageKey];

      if (data) {
        titleEl.textContent = data.title;
        textEl.textContent = data.text;
        iconEl.innerHTML = data.icon;
      }
    });
  });
}

// 3. Technical Skills Filter Tabs
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 4. Copy Email functionality
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailText = document.getElementById('emailText').textContent.trim();

  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText).then(() => {
      showToast('Email address copied to clipboard!');
    }).catch(() => {
      showToast('Copied: ' + emailText);
    });
  });
}

// 5. Contact Form Submission Handling
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const senderName = document.getElementById('senderName').value;
      showToast(`Thank you, ${senderName}! Your message has been sent.`);
      contactForm.reset();
    });
  }
}

// Toast notification helper
function showToast(message) {
  const toast = document.getElementById('toastNotice');
  const toastMsg = document.getElementById('toastMessage');
  toastMsg.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// 6. Mobile Navigation Menu Toggle
function initMobileNav() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navbar = document.querySelector('.navbar');

  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      navbar.classList.toggle('mobile-nav-active');
    });
  }
}

// 7. Active Scroll Highlight
function initActiveScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

function setCurrentYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
