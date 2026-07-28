/* SML Limited — homepage interactions
   nav · scroll reveal sequence · stat counters · product tabs · FAQ accordion */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- nav */

  var nav = document.getElementById('nav');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
    // the open panel is white, so force the dark nav treatment behind it
    if (open) nav.classList.add('scrolled');
    else onScroll();
  });

  navLinks.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      onScroll();
    }
  });

  /* ------------------------------------------------------- hero slider */

  var hero = document.querySelector('.hero');
  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var dotsEl = document.getElementById('slideDots');
  var SLIDE_MS = 6000;

  if (slides.length > 1) {
    var current = 0;
    var timer = null;

    slides.forEach(function (_, i) {
      var d = document.createElement('button');
      d.className = 'slider-dot' + (i === 0 ? ' is-active' : '');
      d.type = 'button';
      d.setAttribute('role', 'tab');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.addEventListener('click', function () { go(i); });
      dotsEl.appendChild(d);
    });
    var dots = Array.prototype.slice.call(dotsEl.children);

    function go(next) {
      if (next === current) return;
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = (next + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      // re-add the dot so its fill animation restarts from zero
      var fresh = dots[current].cloneNode(true);
      fresh.addEventListener('click', function () { go(dots.indexOf(fresh)); });
      dotsEl.replaceChild(fresh, dots[current]);
      dots[current] = fresh;
      fresh.classList.add('is-active');
      restart();
    }

    function restart() {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(function () { go(current + 1); }, SLIDE_MS);
    }

    document.getElementById('slideNext').addEventListener('click', function () { go(current + 1); });
    document.getElementById('slidePrev').addEventListener('click', function () { go(current - 1); });

    // pause while the pointer is over the hero, and while the tab is hidden
    hero.addEventListener('mouseenter', function () {
      hero.classList.add('is-paused');
      clearInterval(timer);
    });
    hero.addEventListener('mouseleave', function () {
      hero.classList.remove('is-paused');
      restart();
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearInterval(timer);
      else restart();
    });

    restart();
  }

  /* --------------------------------------------- global footprint map */

  var mapHolder = document.getElementById('mapHolder');

  if (mapHolder && window.WORLD_MAP_SVG) {
    mapHolder.innerHTML = window.WORLD_MAP_SVG;
    var mapSvg = mapHolder.querySelector('.map-svg');
    var countries = Array.prototype.slice.call(mapSvg.querySelectorAll('.cty'));

    // Push each country out along the bearing from the map's centre through its
    // own centre, so the set scatters across all 360 degrees and converges back.
    // Measured once, lazily, to keep it off the critical path.
    var plotted = false;
    function plot() {
      if (plotted) return;
      plotted = true;

      var box = mapSvg.viewBox.baseVal;
      var cx = box.width / 2;
      var cy = box.height / 2;
      var reach = Math.sqrt(box.width * box.width + box.height * box.height);

      countries.forEach(function (el, i) {
        var b = el.getBBox();
        var dx = (b.x + b.width / 2) - cx;
        var dy = (b.y + b.height / 2) - cy;
        var len = Math.sqrt(dx * dx + dy * dy);

        // a shape sitting dead centre has no bearing of its own — give it one
        if (len < 0.01) {
          var a = i * 2.399963;           // golden angle, spreads them evenly
          dx = Math.cos(a); dy = Math.sin(a); len = 1;
        }

        // far enough out to clear the frame, close enough that the travel reads
        var push = reach * 0.55 + (i % 6) * 45;
        el.style.setProperty('--tx', (dx / len * push).toFixed(1) + 'px');
        el.style.setProperty('--ty', (dy / len * push).toFixed(1) + 'px');
        el.style.setProperty('--rot', ((i % 2 ? 1 : -1) * (14 + (i % 5) * 9)) + 'deg');

        // outermost land arrives first, centre fills in last — reads as assembly
        var ratio = Math.min(1, len / (reach / 2));
        el.style.setProperty('--dly', Math.round((1 - ratio) * 300 + (i % 11) * 18) + 'ms');
      });
    }

    var mapObserver = null;

    function launchMap() {
      if (mapSvg.classList.contains('is-in')) return;
      plot();
      mapSvg.classList.add('is-in');
      if (mapObserver) mapObserver.disconnect();
      window.removeEventListener('scroll', onMapScroll);
      window.removeEventListener('resize', onMapScroll);
    }

    // fires once the section is meaningfully on screen
    function mapInView() {
      var r = mapSvg.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.85 && r.bottom > vh * 0.15;
    }

    function onMapScroll() {
      if (mapInView()) launchMap();
    }

    if (reduceMotion) {
      mapSvg.classList.add('is-in');
    } else {
      plot();

      if ('IntersectionObserver' in window) {
        mapObserver = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) launchMap();
          });
        }, { threshold: 0.2 });
        mapObserver.observe(mapSvg);
      }

      // belt and braces — a plain scroll check, so the assembly can never be
      // stranded if the observer misses an update
      window.addEventListener('scroll', onMapScroll, { passive: true });
      window.addEventListener('resize', onMapScroll, { passive: true });
      onMapScroll();
    }
  }

  /* ------------------------------------------------- scroll reveal seq */

  var revealables = document.querySelectorAll('[data-reveal]');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('in'); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealables.forEach(function (el) { revealer.observe(el); });
  }

  /* -------------------------------------------------- stat count-up */

  function formatCount(value, suffix) {
    return value.toLocaleString('en-US') + (suffix || '');
  }

  /* all counters in a group share one clock and a linear ramp, so every
     stat lands on its final value at the same moment regardless of size */
  function runCounterGroup(els) {
    var items = [];
    els.forEach(function (el) {
      items.push({
        el: el,
        target: parseInt(el.getAttribute('data-count'), 10),
        suffix: el.getAttribute('data-suffix') || ''
      });
    });

    if (reduceMotion) {
      items.forEach(function (it) {
        it.el.textContent = formatCount(it.target, it.suffix);
      });
      return;
    }

    var duration = 1500;
    var start = null;

    function tick(now) {
      if (start === null) start = now;
      var progress = Math.min((now - start) / duration, 1);
      items.forEach(function (it) {
        var value = progress === 1 ? it.target : Math.round(it.target * progress);
        it.el.textContent = formatCount(value, it.suffix);
      });
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  var counters = document.querySelectorAll('[data-count]');
  var counterGroups = [];
  counters.forEach(function (el) {
    var holder = el.closest('.presence-grid') || el;
    for (var i = 0; i < counterGroups.length; i++) {
      if (counterGroups[i].holder === holder) { counterGroups[i].els.push(el); return; }
    }
    counterGroups.push({ holder: holder, els: [el], started: false });
  });

  if (!('IntersectionObserver' in window)) {
    counterGroups.forEach(function (g) { runCounterGroup(g.els); });
  } else {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        counterGroups.forEach(function (g) {
          if (g.holder === entry.target && !g.started) {
            g.started = true;
            runCounterGroup(g.els);
            countObserver.unobserve(entry.target);
          }
        });
      });
    }, { threshold: 0.3 });
    counterGroups.forEach(function (g) { countObserver.observe(g.holder); });
  }

  /* ----------------------------------------------------- product tabs */

  var CATEGORIES = [
    { key: 'all',         label: 'All Products' },
    { key: 'insecticide', label: 'Insecticides' },
    { key: 'fungicide',   label: 'Fungicides' },
    { key: 'herbicide',   label: 'Herbicides' },
    { key: 'fertiliser',  label: 'Crop Nutrition' },
    { key: 'biological',  label: 'Biologicals' },
    { key: 'pgr',         label: 'PGR' }
  ];

  var tabsEl = document.getElementById('tabs');
  var gridEl = document.getElementById('productGrid');
  var products = window.PRODUCTS || (typeof PRODUCTS !== 'undefined' ? PRODUCTS : []);

  // the home page only shows a curated shelf; the tabbed catalogue lives on
  // the product page, so everything below no-ops without #tabs/#productGrid
  var allCountEl = document.getElementById('allCount');
  if (allCountEl) allCountEl.textContent = products.length;

  if (tabsEl && gridEl) {

  function countFor(key) {
    return key === 'all'
      ? products.length
      : products.filter(function (p) { return p.cat === key; }).length;
  }

  CATEGORIES.forEach(function (cat, i) {
    var b = document.createElement('button');
    b.className = 'tab' + (i === 0 ? ' active' : '');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.dataset.cat = cat.key;
    b.innerHTML = cat.label + '<span>' + countFor(cat.key) + '</span>';
    tabsEl.appendChild(b);
  });

  var arrowIcon =
    '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round">' +
    '<path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  function render(cat) {
    var list = cat === 'all'
      ? products
      : products.filter(function (p) { return p.cat === cat; });

    gridEl.innerHTML = list.map(function (p, i) {
      // stagger only the first couple of rows — beyond that it just feels slow
      var delay = Math.min(i, 11) * 45;
      var thumb = p.img
        ? '<img src="' + p.img + '" alt="' + p.name + '" loading="lazy">'
        : '';
      return '' +
        '<article class="product-card" style="animation-delay:' + delay + 'ms">' +
          '<div class="product-thumb">' + thumb + '</div>' +
          '<div class="product-body">' +
            '<div class="product-tag">' + p.catLabel + '</div>' +
            '<h3>' + p.name + '</h3>' +
            (p.note ? '<p class="product-note">' + p.note + '</p>' : '') +
            '<span class="product-link">View details ' + arrowIcon + '</span>' +
          '</div>' +
        '</article>';
    }).join('');
  }

  render('all');

  function selectTab(key) {
    var btn = tabsEl.querySelector('[data-cat="' + key + '"]');
    if (!btn) return;
    tabsEl.querySelectorAll('.tab').forEach(function (t) { t.classList.remove('active'); });
    btn.classList.add('active');
    render(key);
  }

  tabsEl.addEventListener('click', function (e) {
    var btn = e.target.closest('.tab');
    if (btn) selectTab(btn.dataset.cat);
  });

  // in-page links can deep-link into a category
  document.querySelectorAll('[data-jump]').forEach(function (link) {
    link.addEventListener('click', function () {
      selectTab(link.getAttribute('data-jump'));
    });
  });

  } /* end catalogue guard */

  /* ------------------------------------------------------------- FAQ */

  var faqList = document.getElementById('faqList');

  faqList.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');

      // accordion — only one panel at a time
      faqList.querySelectorAll('.faq-item').forEach(function (other) {
        other.classList.remove('open');
        other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ------------------------------------------------------------ misc */

  document.getElementById('yr').textContent = new Date().getFullYear();
})();
