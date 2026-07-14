document.addEventListener('DOMContentLoaded', function () {

  /* ---------- AOS ---------- */
  if (window.AOS) {
    AOS.init({ duration: 700, once: true, offset: 60, easing: 'ease-out-cubic' });
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  var nav = document.getElementById('mainNav');
  var onScroll = function () {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  var setActive = function () {
    var scrollPos = window.scrollY + 140;
    sections.forEach(function (sec) {
      if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        var active = document.querySelector('.navbar-nav .nav-link[href="#' + sec.id + '"]');
        if (active) active.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', setActive);

  /* Close mobile menu after clicking a link */
  var navCollapseEl = document.getElementById('navMain');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navCollapseEl.classList.contains('show') && window.bootstrap) {
        var collapse = window.bootstrap.Collapse.getOrCreateInstance(navCollapseEl);
        collapse.hide();
      }
    });
  });

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Stat counters ---------- */
  var statNumbers = document.querySelectorAll('.stat-number[data-count]');
  var animateCount = function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var current = 0;
    var duration = 1400;
    var start = null;
    var step = function (ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      current = Math.floor(progress * target);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  };

  /* ---------- Skill bar fill ---------- */
  var fillSkillBar = function (bar) {
    var percent = bar.getAttribute('data-percent');
    var fill = bar.querySelector('.skill-fill');
    if (fill) fill.style.width = percent + '%';
  };

  /* ---------- IntersectionObserver: counters + skill bars ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      if (entry.target.classList.contains('stat-number')) {
        animateCount(entry.target);
        io.unobserve(entry.target);
      }
      if (entry.target.classList.contains('skill-bar')) {
        fillSkillBar(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statNumbers.forEach(function (el) { io.observe(el); });
  document.querySelectorAll('.skill-bar').forEach(function (el) { io.observe(el); });

  /* ---------- Portfolio filter ---------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var portfolioItems = document.querySelectorAll('.portfolio-item');
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');
      portfolioItems.forEach(function (item) {
        var match = filter === 'all' || item.getAttribute('data-category') === filter;
        item.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ---------- Case study toggle ---------- */
  document.querySelectorAll('[data-case-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (panel) panel.classList.toggle('is-open', !isOpen);
      btn.innerHTML = isOpen
        ? 'Read Full Case Study <i class="fa-solid fa-chevron-down"></i>'
        : 'Hide Case Study <i class="fa-solid fa-chevron-down"></i>';
    });
  });

  /* ---------- Contact form (front-end only — wire to your backend/email service) ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      status.textContent = 'Thanks! Your message has been noted — connect this form to your email service or backend to receive it.';
      form.reset();
    });
  }

  /* ---------- Hero signature animation: pixels resolving into a neural network ---------- */
  var canvas = document.getElementById('pixelField');
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w, h, nodes = [];
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize() {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    }

    function buildNodes() {
      var cols = Math.max(8, Math.floor(w / 90));
      var rows = Math.max(5, Math.floor(h / 90));
      nodes = [];
      for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          var baseX = (i + 0.5) * (w / cols);
          var baseY = (j + 0.5) * (h / rows);
          nodes.push({
            baseX: baseX,
            baseY: baseY,
            x: baseX,
            y: baseY,
            phase: Math.random() * Math.PI * 2,
            speed: 0.25 + Math.random() * 0.35,
            amp: 10 + Math.random() * 14,
            r: Math.random() < 0.12 ? 2.2 : 1.2
          });
        }
      }
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      var maxDist = Math.max(w, h) / 7;

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x = n.baseX + Math.cos(t * 0.0006 * n.speed + n.phase) * n.amp;
        n.y = n.baseY + Math.sin(t * 0.0006 * n.speed + n.phase) * n.amp;
      }

      ctx.lineWidth = 0.6;
      for (var a = 0; a < nodes.length; a++) {
        for (var b = a + 1; b < nodes.length; b++) {
          var dx = nodes[a].x - nodes[b].x;
          var dy = nodes[a].y - nodes[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            var alpha = (1 - dist / maxDist) * 0.16;
            ctx.strokeStyle = 'rgba(124,92,252,' + alpha + ')';
            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.stroke();
          }
        }
      }

      for (var k = 0; k < nodes.length; k++) {
        var node = nodes[k];
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fillStyle = node.r > 2 ? 'rgba(34,211,238,0.75)' : 'rgba(79,134,245,0.5)';
        ctx.fill();
      }

      if (!prefersReducedMotion) requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    requestAnimationFrame(draw);
  }

});
