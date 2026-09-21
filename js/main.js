/* main.js — theme toggle, UI-style switcher, nav behaviour. No dependencies. */
(function () {
  'use strict';

  var root = document.documentElement;

  var STYLE_NOTES = {
    glass:   'Frosted, translucent panels over colour blobs.',
    neu:     'One ground colour; everything is extruded from it with paired light and dark shadows.',
    liquid:  'Highly saturated, refractive glass with a specular rim and pill geometry.',
    spatial: 'Floating translucent panes with real depth over an environment — visionOS-style.',
    bento:   'Everything becomes tiles on one tight grid.',
    clay:    'Puffy shapes with a thick under-shadow and a bright inner highlight.',
    skeuo:   'Leather, paper and glossy buttons — the interface imitates real materials.',
    minimal: 'White space, hairlines and one weight. Nothing decorative.',
    maximal: 'Clashing colour, thick outlines, patterns and hard offset shadows.',
    brutal:  'Raw type, heavy borders, zero radius, hard offset shadows.'
  };
  var STYLE_NAMES = {
    glass: 'Glassmorphism', neu: 'Neumorphism', liquid: 'Liquid Glass', spatial: 'Spatial UI', bento: 'Bento Grid',
    clay: 'Claymorphism', skeuo: 'Skeuomorphism', minimal: 'Minimalism', maximal: 'Maximalism', brutal: 'Brutalism'
  };
  var ORDER = ['glass', 'neu', 'liquid', 'spatial', 'bento', 'clay', 'skeuo', 'minimal', 'maximal', 'brutal'];

  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
  function read(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  /* ---------- theme (default: dark) ---------- */
  var themeToggle = document.getElementById('theme-toggle');
  var themeReadout = document.getElementById('theme-readout');
  var segButtons = document.querySelectorAll('.seg [data-theme]');

  function applyTheme(theme) {
    theme = theme === 'light' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    themeReadout.textContent = theme === 'dark' ? 'Dark' : 'Light';
    for (var i = 0; i < segButtons.length; i++) {
      segButtons[i].setAttribute('aria-pressed', segButtons[i].getAttribute('data-theme') === theme ? 'true' : 'false');
    }
    store('as-theme', theme);
  }
  themeToggle.addEventListener('click', function () {
    applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
  for (var s = 0; s < segButtons.length; s++) {
    segButtons[s].addEventListener('click', function () { applyTheme(this.getAttribute('data-theme')); });
  }

  /* ---------- UI style (default: glass) ---------- */
  var styleButtons = document.querySelectorAll('.style-btn');
  var styleReadout = document.getElementById('style-readout');
  var dockNote = document.getElementById('dock-note');

  function applyStyle(style) {
    if (!STYLE_NOTES[style]) style = 'glass';
    if (style === 'glass') root.removeAttribute('data-style'); else root.setAttribute('data-style', style);
    for (var i = 0; i < styleButtons.length; i++) {
      styleButtons[i].setAttribute('aria-pressed', styleButtons[i].getAttribute('data-style') === style ? 'true' : 'false');
    }
    styleReadout.textContent = STYLE_NAMES[style];
    dockNote.textContent = STYLE_NOTES[style];
    store('as-style', style);
  }
  for (var b = 0; b < styleButtons.length; b++) {
    styleButtons[b].addEventListener('click', function () { applyStyle(this.getAttribute('data-style')); });
  }
  function currentStyle() { return root.getAttribute('data-style') || 'glass'; }
  function stepStyle(dir) {
    var idx = ORDER.indexOf(currentStyle());
    applyStyle(ORDER[(idx + dir + ORDER.length) % ORDER.length]);
  }

  /* ---------- dock open/close ---------- */
  var dockToggle = document.getElementById('dock-toggle');
  var dockPanel = document.getElementById('dock-panel');
  function setDock(open) {
    dockPanel.hidden = !open;
    dockToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  dockToggle.addEventListener('click', function () { setDock(dockPanel.hidden); });
  document.addEventListener('click', function (e) {
    if (dockPanel.hidden) return;
    if (!e.target.closest('.dock')) setDock(false);
  });

  /* ---------- keyboard: [ ] cycle styles, T toggles theme, Esc closes dock ---------- */
  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select' || e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === '[') stepStyle(-1);
    else if (e.key === ']') stepStyle(1);
    else if (e.key === 't' || e.key === 'T') themeToggle.click();
    else if (e.key === 'Escape') setDock(false);
  });

  /* ---------- mobile menu ---------- */
  var menuToggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('nav');
  menuToggle.addEventListener('click', function () {
    var open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); }
  });

  /* ---------- active section in nav ---------- */
  var navLinks = nav.querySelectorAll('a[href^="#"]');
  var sections = [];
  for (var n = 0; n < navLinks.length; n++) {
    var target = document.querySelector(navLinks[n].getAttribute('href'));
    if (target) sections.push({ el: target, link: navLinks[n] });
  }
  if ('IntersectionObserver' in window && sections.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        for (var i = 0; i < sections.length; i++) {
          sections[i].link.classList.toggle('active', sections[i].el === entry.target);
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (sct) { io.observe(sct.el); });
  }

  /* ---------- boot ---------- */
  applyTheme(read('as-theme') || 'dark');
  applyStyle(read('as-style') || 'glass');
  document.getElementById('year').textContent = String(new Date().getFullYear());
})();
