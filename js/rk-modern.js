// Rohitash Kator — Modern behaviors layer
// - Removes legacy style switcher
// - Replaces inline onclick filtering with delegated handlers

(function () {
  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function removeLegacyStyleSwitcher() {
    var switcher = document.getElementById('style-switcher');
    if (switcher && switcher.parentNode)
      switcher.parentNode.removeChild(switcher);
  }

  function reorderHomeSections() {
    // Ensure Projects appears before About (consistency with template)
    var main = document.querySelector('main.rk-behance');
    if (!main) return;

    var about = document.getElementById('about');
    var work = document.getElementById('work');
    if (!about || !work) return;

    // Move work before about if needed
    if (
      work.compareDocumentPosition(about) & Node.DOCUMENT_POSITION_FOLLOWING
    ) {
      main.insertBefore(work, about);
    }
  }

  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      var trigger =
        (e.target && e.target.closest && e.target.closest('[data-scrollto]')) ||
        (e.target &&
          e.target.closest &&
          e.target.closest(".rk-nav a[href^='#']")) ||
        null;

      if (!trigger) return;

      var targetSel =
        trigger.getAttribute('data-scrollto') || trigger.getAttribute('href');
      if (!targetSel || targetSel.charAt(0) !== '#') return;

      var target = qs(targetSel);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function initLangToggle() {
    var btn = qs('[data-lang-toggle]');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var items = qsa('[data-lang]', btn);
      if (!items.length) return;

      var activeIdx = items.findIndex(function (el) {
        return el.classList.contains('is-active');
      });
      var nextIdx = activeIdx === -1 ? 0 : (activeIdx + 1) % items.length;

      items.forEach(function (el, idx) {
        el.classList.toggle('is-active', idx === nextIdx);
      });
    });
  }

  function initContactForm() {
    var form =
      document.getElementById('rk-contact-form') ||
      document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var statusEl =
        document.getElementById('rk-form-status') ||
        document.getElementById('error-msg');
      function setStatus(msg) {
        if (!statusEl) return;
        statusEl.textContent = msg || '';
        if (statusEl.style) statusEl.style.opacity = msg ? '1' : '0';
      }

      var name = (qs("[name='name']", form) || {}).value || '';
      var email = (qs("[name='email']", form) || {}).value || '';
      var subject =
        (qs("[name='subject']", form) || {}).value || 'Portfolio contact';
      var message = (qs("[name='message']", form) || {}).value || '';

      var endpoint = form.getAttribute('data-api-endpoint') || '';
      var endpointIsConfigured =
        endpoint &&
        endpoint.indexOf('yourFormId') === -1 &&
        endpoint.indexOf('example') === -1;

      function openMailto() {
        var body = [
          'Hi Rohitash,',
          '',
          message.trim(),
          '',
          '—',
          'From: ' + (name.trim() || 'Anonymous'),
          email.trim() ? 'Email: ' + email.trim() : '',
        ]
          .filter(Boolean)
          .join('\n');

        setStatus('Please use the form below to get in touch.');
        var contactEl = document.getElementById('contact');
        if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (endpointIsConfigured && window.fetch) {
        setStatus('Sending…');
        fetch(endpoint, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            subject: subject.trim(),
            message: message.trim(),
            page: window.location.href,
          }),
        })
          .then(function (res) {
            if (!res.ok) throw new Error('Request failed');
            setStatus('Message sent. Thanks!');
            form.reset();
          })
          .catch(function () {
            setStatus('Could not send via API. Opening email client…');
            openMailto();
          });
        return;
      }

      setStatus('Opening email client…');
      openMailto();
    });
  }

  function initMediaModal() {
    var modalEl = document.getElementById('rk-media-modal');
    var imgEl = document.getElementById('rk-media-modal-img');
    var titleEl = document.getElementById('rk-media-modal-title');

    if (!modalEl || !imgEl) return;

    document.addEventListener('click', function (e) {
      var a =
        e.target && e.target.closest
          ? e.target.closest("[data-rk-modal='media']") ||
            e.target.closest('a[data-src][href]')
          : null;
      if (!a) return;

      var href = (a.getAttribute('href') || '').trim();
      var dataSrc = (a.getAttribute('data-src') || '').trim();
      var src = href && href !== '#' && href.indexOf('#') !== 0
        ? href
        : dataSrc.replace(/^\.\//, '');
      var title = a.getAttribute('data-rk-title') || a.getAttribute('title') || 'Certificate';
      if (!src) return;

      e.preventDefault();

      imgEl.src = src;
      imgEl.alt = title;
      if (titleEl) titleEl.textContent = title;

      // Bootstrap modal if available (compat across Bootstrap versions)
      if (window.bootstrap && typeof window.bootstrap.Modal === 'function') {
        var inst = null;
        try {
          if (typeof window.bootstrap.Modal.getInstance === 'function') {
            inst = window.bootstrap.Modal.getInstance(modalEl);
          }
        } catch (_) {
          inst = null;
        }
        if (!inst) inst = new window.bootstrap.Modal(modalEl);
        inst.show();
      } else {
        window.open(src, '_blank', 'noopener,noreferrer');
      }
    });

    // Cleanup image src on close (avoid keeping large images in memory)
    modalEl.addEventListener('hidden.bs.modal', function () {
      imgEl.src = '';
    });
  }

  function initCarousel() {
    var root = qs('[data-carousel]');
    if (!root) return;

    var track = qs('[data-carousel-track]', root);
    var dotsWrap = qs('[data-carousel-dots]', root);
    var btnPrev = qs('[data-carousel-prev]', root);
    var btnNext = qs('[data-carousel-next]', root);
    if (!track || !dotsWrap) return;

    var items = Array.prototype.slice.call(track.children || []);
    if (!items.length) return;

    function prefersReducedMotion() {
      return (
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      );
    }

    function setActive(idx) {
      var dots = qsa('[data-carousel-dot]', dotsWrap);
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === idx);
        if (i === idx) d.setAttribute('aria-current', 'true');
        else d.removeAttribute('aria-current');
      });
    }

    function scrollToIndex(idx) {
      if (!items.length) return;
      var i = (idx + items.length) % items.length;
      items[i].scrollIntoView({
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'center',
      });
      setActive(i);
    }

    // Dots
    dotsWrap.innerHTML = '';
    items.forEach(function (_, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'rk-carousel-dot' + (i === 0 ? ' is-active' : '');
      b.setAttribute('data-carousel-dot', String(i));
      b.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      if (i === 0) b.setAttribute('aria-current', 'true');
      b.addEventListener('click', function () {
        scrollToIndex(i);
      });
      dotsWrap.appendChild(b);
    });

    var current = 0;
    if (btnPrev) {
      btnPrev.addEventListener('click', function () {
        current = current - 1;
        scrollToIndex(current);
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', function () {
        current = current + 1;
        scrollToIndex(current);
      });
    }

    // Keep current in sync with scroll (nearest item to center)
    var raf = null;
    track.addEventListener('scroll', function () {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(function () {
        var rect = track.getBoundingClientRect();
        var center = rect.left + rect.width / 2;
        var best = 0;
        var bestDist = Infinity;
        items.forEach(function (el, idx) {
          var r = el.getBoundingClientRect();
          var c = r.left + r.width / 2;
          var d = Math.abs(center - c);
          if (d < bestDist) {
            bestDist = d;
            best = idx;
          }
        });
        current = best;
        setActive(best);
      });
    });
  }

  function initPortfolioFilter() {
    var container = document.getElementById('filter');
    if (!container) return;

    var items = qsa('.projects-wrapper .filter-box');
    if (!items.length) return;

    function setActive(link) {
      qsa('.categories.active', container).forEach(function (el) {
        el.classList.remove('active');
      });
      if (link) link.classList.add('active');
    }

    function applyFilter(filter) {
      var key = (filter || 'all').toLowerCase();
      items.forEach(function (item) {
        var show = key === 'all' ? true : item.classList.contains(key);
        // Template CSS hides `.filter-box` by default and shows only `.filter-box.show`
        // So we keep both mechanisms in sync:
        item.hidden = !show;
        item.classList.toggle('show', show);
      });
    }

    container.addEventListener('click', function (e) {
      var link =
        e.target && e.target.closest ? e.target.closest('[data-filter]') : null;
      if (!link) return;
      e.preventDefault();

      var filter = link.getAttribute('data-filter') || 'all';
      setActive(link);
      applyFilter(filter);
    });

    // Initial state
    var initial =
      qs('[data-filter].active', container) || qs('[data-filter]', container);
    if (initial) {
      setActive(initial);
      applyFilter(initial.getAttribute('data-filter'));
    }
  }

  function initProjectDetail() {
    var titleEl = document.getElementById('rk-project-title');
    var summaryEl = document.getElementById('rk-project-summary');
    var bulletsEl = document.getElementById('rk-project-bullets');
    var metaEl = document.getElementById('rk-project-meta');
    var techEl = document.getElementById('rk-project-tech');
    var img1 = document.getElementById('rk-project-img-1');
    var img2 = document.getElementById('rk-project-img-2');
    var img3 = document.getElementById('rk-project-img-3');

    if (!titleEl || !summaryEl || !bulletsEl || !metaEl || !techEl) return;

    var params = new URLSearchParams(window.location.search || '');
    var key = (params.get('project') || 'poll').toLowerCase();

    var PROJECTS = {
      poll: {
        title: 'Poll Management System (Internal / POC)',
        summary:
          'Production-grade poll platform with dynamic questions, role-based access, real-time reporting, and analytics visualizations.',
        bullets: [
          'Designed and developed a poll management system with dynamic questions, real-time reporting, and role-based access.',
          'Built secure, scalable REST APIs (Node.js + Express.js) for poll lifecycle management and voting workflows.',
          'Developed responsive admin UIs using Angular and React for consistent cross-platform experience.',
          'Integrated analytics and visualizations for poll results to improve insight delivery and engagement.',
          'Emphasized modular architecture, code reusability, and scalability for future enhancements.',
        ],
        tech: [
          'Node.js',
          'Express.js',
          'TypeScript',
          'MongoDB',
          'REST APIs',
          'React',
          'Angular',
          'RBAC',
        ],
        meta: [
          ['Company', 'Talentica Software'],
          ['Role', 'Software Engineer'],
          ['Timeline', 'Nov 2024 - Present (Remote)'],
          ['Type', 'Internal / POC'],
        ],
        images: [
          'images/poll-management-system/dashboard.svg',
          'images/poll-management-system/create-poll.svg',
          'images/poll-management-system/analytics.svg',
        ],
      },
      julius: {
        title:
          'Julius Influencer Marketing & Campaign Platform (Client: Triller)',
        summary:
          'Microservices-based platform for campaign tracking, influencer lifecycle management, content ingestion, and analytics/reporting.',
        bullets: [
          'Contributed to multiple backend microservices focusing on campaign tracking, analytics accuracy, and reliability.',
          'Implemented Instagram Stories ingestion via Phyllo in a dedicated NestJS microservice (replacing brittle scrapers).',
          'Improved ingestion and collection tracking using CRON-based workflows and backfill logic without double-counting.',
          'Enhanced GraphQL reporting for analytics/payouts with schema improvements and Prometheus observability metrics.',
          'Improved rollout safety and reliability using feature flags, safer defaults, tuned schedules, and unit/integration tests.',
        ],
        tech: [
          'Node.js',
          'TypeScript',
          'NestJS',
          'Grind.js',
          'GraphQL',
          'MySQL',
          'Redis',
          'RabbitMQ',
          'Elasticsearch',
          'AWS',
        ],
        meta: [
          ['Company', 'Talentica Software'],
          ['Role', 'Software Engineer'],
          ['Timeline', 'Nov 2024 - Present (Remote)'],
          ['Type', 'Client project (Triller)'],
        ],
        images: [
          'images/julius-influencer-platform/campaign-dashboard.svg',
          'images/julius-influencer-platform/influencer-discovery.svg',
          'images/julius-influencer-platform/analytics-reporting.svg',
        ],
      },
      chat: {
        title: 'Real-Time Chat Application (Internal / POC)',
        summary:
          'Full-stack real-time chat with JWT auth, rooms, presence, typing indicators, and message state tracking over WebSockets.',
        bullets: [
          'Built a full-stack real-time chat application using NestJS + Angular with low-latency Socket.IO messaging.',
          'Implemented JWT auth for REST APIs and Socket.IO connections with secure room access and message publishing.',
          'Designed PostgreSQL schema (users, rooms, memberships, messages, message_status) using TypeORM migrations + seeds.',
          'Added production readiness: rate limiting, health checks, structured logging, and automated tests.',
          'Designed for horizontal scalability with stateless REST services and scalable WebSocket gateways (Redis-ready).',
        ],
        tech: [
          'NestJS',
          'TypeScript',
          'Angular',
          'PostgreSQL',
          'Socket.IO',
          'TypeORM',
          'JWT',
        ],
        meta: [
          ['Company', 'Talentica Software'],
          ['Role', 'Software Engineer'],
          ['Timeline', 'Nov 2024 - Present (Remote)'],
          ['Type', 'Internal / POC'],
        ],
        images: [
          'images/real-time-chat-app/chat-rooms.svg',
          'images/real-time-chat-app/auth-flow.svg',
          'images/real-time-chat-app/typing-presence.svg',
        ],
      },
      famo: {
        title: 'FamO Money - FinTech Platform (Client: FamO)',
        summary:
          'FinTech platform enabling multi-asset investment tracking, portfolio valuation, profit/loss, and actionable insights.',
        bullets: [
          'Built backend features for onboarding, deal digests, discussions/messaging, and notifications.',
          'Integrated real-time market data APIs to compute portfolio valuation, profit/loss, and insights.',
          'Designed scalable database schemas and developed secure, high-performance APIs for financial operations.',
        ],
        tech: ['Node.js', 'NestJS', 'React.js', 'PostgreSQL', 'TypeORM'],
        meta: [
          ['Company', 'Eternalight Infotech'],
          ['Role', 'Software Engineer'],
          ['Timeline', 'Feb 2024 - Nov 2024 (Remote)'],
          ['Type', 'Client project (FamO)'],
        ],
        images: [
          'images/famo-money-fintech/family-dashboard.svg',
          'images/famo-money-fintech/market-data.svg',
          'images/famo-money-fintech/deal-digest.svg',
        ],
      },
      contract: {
        title: 'Contract Note Parser (Client: FamO)',
        summary:
          'Document-processing service to parse broker contract notes and extract structured transactions from PDFs using OCR + LLMs.',
        bullets: [
          'Designed a service to extract structured transaction data from PDFs (contract notes).',
          'Improved throughput using multi-threading and page chunking (batches of 10 pages).',
          'Used AWS Textract + LLM extraction to achieve 95%+ accuracy across varied formats.',
          'Implemented validation workflows before persistence, reducing manual data entry by 90%+.',
        ],
        tech: [
          'Python',
          'Flask',
          'PostgreSQL',
          'AWS Textract',
          'OpenAI',
          'LLMs',
        ],
        meta: [
          ['Company', 'Eternalight Infotech'],
          ['Role', 'Software Engineer'],
          ['Timeline', 'Feb 2024 - Nov 2024 (Remote)'],
          ['Type', 'Client project (FamO)'],
        ],
        images: [
          'images/contract-note-parser/upload-pdf.svg',
          'images/contract-note-parser/pipeline.svg',
          'images/contract-note-parser/extracted-data.svg',
        ],
      },
      crash: {
        title: 'Vehicle Crash Analytics Platform',
        summary:
          'Analytics platform with filterable tables, debounced search, reporting/export flows, and cloud-native delivery on GCP.',
        bullets: [
          'Built dynamic, filterable analytics tables with debounced search to improve exploration and usability.',
          'Implemented export-to-PDF functionality and delivered UI enhancements/bug fixes.',
          'Worked across Angular, Node.js, Python/Flask services on Google Cloud.',
        ],
        tech: [
          'Node.js',
          'Angular',
          'Python',
          'Flask',
          'MySQL',
          'Google Cloud',
        ],
        meta: [
          ['Company', 'SpringML Inc.'],
          ['Role', 'Cloud Engineer'],
          ['Timeline', 'Jul 2022 - Nov 2023 (Remote)'],
          ['Type', 'Product / platform'],
        ],
        images: [
          'images/vehicle-crash-analytics/analytics-table.svg',
          'images/vehicle-crash-analytics/dashboard.svg',
          'images/vehicle-crash-analytics/export-pdf.svg',
        ],
      },
      mgic: {
        title: 'MGIC DocAI - Invoice Parser',
        summary:
          'AI-powered invoice parsing system to extract structured data from diverse invoice formats with pre-validation for data quality.',
        bullets: [
          'Designed and developed an AI-powered invoice parsing system to extract structured data from diverse invoice formats.',
          'Built a full-stack solution with an Angular front end and Flask backend, including pre-validation logic before persistence.',
          'Streamlined document processing workflows to significantly reduce manual review effort.',
        ],
        tech: ['Angular', 'Python', 'Flask', 'Vertex AI', 'PostgreSQL'],
        meta: [
          ['Company', 'SpringML Inc.'],
          ['Role', 'Cloud Engineer'],
          ['Timeline', 'Jul 2022 - Nov 2023 (Remote)'],
          ['Type', 'Project (DocAI)'],
        ],
        images: [
          'images/mgic-docai-invoice-parser/upload-invoice.svg',
          'images/mgic-docai-invoice-parser/ai-extraction.svg',
          'images/mgic-docai-invoice-parser/extracted-fields.svg',
        ],
      },
      cloud: {
        title: 'Cloud Infrastructure & Analytics',
        summary:
          'Cloud governance and analytics enablement: IAM hardening, interactive dashboards, and performance/scalability improvements.',
        bullets: [
          'Managed GCP IAM configurations to enforce least-privilege access and security best practices.',
          'Built interactive dashboards using Looker and Looker Studio to deliver real-time insights.',
          'Supported scalability and performance optimization of cloud infrastructure across multiple projects.',
        ],
        tech: [
          'Google Cloud',
          'IAM',
          'Looker',
          'Looker Studio',
          'Observability',
        ],
        meta: [
          ['Company', 'SpringML Inc.'],
          ['Role', 'Cloud Engineer'],
          ['Timeline', 'Jul 2022 - Nov 2023 (Remote)'],
          ['Type', 'Cloud infrastructure'],
        ],
        images: [
          'images/cloud-infrastructure-analytics/gcp-iam.svg',
          'images/cloud-infrastructure-analytics/looker-dashboard.svg',
          'images/cloud-infrastructure-analytics/infrastructure.svg',
        ],
      },
    };

    var data = PROJECTS[key] || PROJECTS.poll;

    titleEl.textContent = data.title;
    summaryEl.textContent = data.summary;

    // Bullets
    bulletsEl.innerHTML = '';
    (data.bullets || []).forEach(function (b) {
      var li = document.createElement('li');
      li.textContent = b;
      bulletsEl.appendChild(li);
    });

    // Meta
    metaEl.innerHTML = '';
    (data.meta || []).forEach(function (pair) {
      var li = document.createElement('li');
      li.className = 'mt-3';
      li.innerHTML = '<b>' + pair[0] + ':</b> <span>' + pair[1] + '</span>';
      metaEl.appendChild(li);
    });

    // Tech chips
    techEl.innerHTML = '';
    (data.tech || []).forEach(function (t) {
      var chip = document.createElement('span');
      chip.className = 'rk-chip';
      chip.textContent = t;
      techEl.appendChild(chip);
    });

    // Images
    var imgs = data.images || [];
    if (img1 && imgs[0]) img1.src = imgs[0];
    if (img2 && imgs[1]) img2.src = imgs[1];
    if (img3 && imgs[2]) img3.src = imgs[2];
    if (img1) img1.alt = data.title + ' — image 1';
    if (img2) img2.alt = data.title + ' — image 2';
    if (img3) img3.alt = data.title + ' — image 3';

    document.title = 'Rohitash Kator | ' + data.title;
  }

  function initArticleDetail() {
    var imgEl = document.getElementById('rk-article-img');
    var titleEl = document.getElementById('rk-article-title');
    var excerptEl = document.getElementById('rk-article-excerpt');
    if (!titleEl) return;

    var params = new URLSearchParams(window.location.search || '');
    var key = (params.get('article') || 'rbac').toLowerCase();

    var ARTICLES = {
      rbac: {
        title: 'RBAC + poll workflows with Node.js & Express',
        image: 'images/poll-management-system/rbac.svg',
        excerpt:
          'In the Poll Management System (Internal / POC), the goal was simple: ship secure and scalable APIs for poll lifecycles (create, publish, vote, close) while keeping authorization predictable and auditable.',
      },
      phyllo: {
        title: 'Reliable ingestion: Instagram Stories via Phyllo',
        image: 'images/julius-influencer-platform/content-ingestion.svg',
        excerpt:
          'Replacing brittle scrapers with Phyllo-based ingestion for Instagram Stories: normalizing metrics, resilient pipelines, and reliable collection tracking without double-counting.',
      },
      textract: {
        title: 'Contract notes: Textract + LLM extraction',
        image: 'images/contract-note-parser/pipeline.svg',
        excerpt:
          'Threading, chunking, validation, and 95%+ accuracy in real workflows. Extracting structured transaction data from broker contract notes using AWS Textract and LLMs.',
      },
    };

    var data = ARTICLES[key] || ARTICLES.rbac;
    titleEl.textContent = data.title;
    if (excerptEl) excerptEl.textContent = data.excerpt;
    if (imgEl && data.image) {
      imgEl.src = data.image;
      imgEl.alt = data.title;
    }
    document.title = 'Rohitash Kator | ' + data.title;
  }

  document.addEventListener('DOMContentLoaded', function () {
    removeLegacyStyleSwitcher();
    reorderHomeSections();
    initSmoothScroll();
    initLangToggle();
    initContactForm();
    initCarousel();
    initPortfolioFilter();
    initProjectDetail();
    initArticleDetail();
    initMediaModal();
  });
})();
