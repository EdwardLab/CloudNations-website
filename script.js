(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  function describeTheme() {
    const dark = root.dataset.theme === 'dark';
    themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
    themeButton.title = themeButton.getAttribute('aria-label');
    themeButton.querySelector('[data-theme-icon]').textContent = dark ? '☼' : '◐';
  }
  describeTheme();
  themeButton.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('cloud-nations-theme', root.dataset.theme); } catch {}
    describeTheme();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    let saved;
    try { saved = localStorage.getItem('cloud-nations-theme'); } catch {}
    if (!saved) { root.dataset.theme = event.matches ? 'dark' : 'light'; describeTheme(); }
  });
  const menu = document.querySelector('#mobile-menu');
  const menuButton = document.querySelector('.menu-toggle');
  function closeMenu(returnFocus = false) {
    menu.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('span').textContent = '+';
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const opening = menu.hidden;
    menu.hidden = !opening;
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.querySelector('span').textContent = opening ? '−' : '+';
  });
  menu.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) closeMenu(true); });
  document.addEventListener('click', event => { if (!menu.hidden && !event.target.closest('.site-header')) closeMenu(); });
  matchMedia('(min-width: 1024px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
  const stage = document.querySelector('[data-id-stage]');
  if (stage) {
    const model = stage.querySelector('.id-model');
    const faces = [stage.querySelector('.id-face-front'), stage.querySelector('.id-face-back')];
    const controls = document.querySelector('.id-switch');
    const sides = [...controls.querySelectorAll('[data-id-side]')];
    let rotation;
    let side = 0;
    let drag;

    function display(nextRotation) {
      rotation = nextRotation;
      model.style.transform = rotation.toString();
      const visibleSide = rotation.m33 < 0 ? 1 : 0;
      if (visibleSide === side) return;
      side = visibleSide;
      faces.forEach((face, index) => { face.inert = index !== side; });
      sides.forEach((button, index) => {
        button.classList.toggle('selected', index === side);
        button.setAttribute('aria-pressed', String(index === side));
      });
    }

    function rotate(horizontal, vertical) {
      const current = rotation ?? new DOMMatrix(getComputedStyle(model).transform);
      const turn = new DOMMatrix().rotateAxisAngleSelf(-vertical, horizontal, 0, Math.hypot(horizontal, vertical));
      display(current.preMultiplySelf(turn));
    }

    stage.dataset.ready = '';
    stage.tabIndex = 0;
    controls.hidden = false;
    document.querySelector('[data-id-hint]').hidden = false;

    sides.forEach((button, index) => button.addEventListener('click', () => {
      display(new DOMMatrix().rotateAxisAngleSelf(0, 1, 0, index * 180));
    }));

    const arrowTurns = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] };
    stage.addEventListener('keydown', event => {
      if (event.target !== stage || !Object.hasOwn(arrowTurns, event.key)) return;
      event.preventDefault();
      rotate(...arrowTurns[event.key]);
    });

    stage.addEventListener('pointerdown', event => {
      if (!event.isPrimary || event.button !== 0 || event.target.closest('a')) return;
      drag = { id: event.pointerId, x: event.clientX, y: event.clientY, degreesPerPixel: 360 / stage.clientWidth, active: false };
      stage.setPointerCapture(drag.id);
    });
    stage.addEventListener('pointermove', event => {
      if (event.pointerId !== drag?.id) return;
      const dx = event.clientX - drag.x;
      const dy = event.clientY - drag.y;
      if (!dx && !dy || !drag.active && Math.hypot(dx, dy) < 4) return;
      drag.active = true;
      stage.classList.add('is-dragging');
      drag.x = event.clientX;
      drag.y = event.clientY;
      rotate(dx * drag.degreesPerPixel, dy * drag.degreesPerPixel);
    });
    for (const event of ['pointerup', 'pointercancel', 'lostpointercapture']) {
      stage.addEventListener(event, pointer => {
        if (pointer.pointerId !== drag?.id) return;
        stage.classList.remove('is-dragging');
        drag = null;
      });
    }
  }
  const example = document.getElementById('example-disclosure');
  if (example) {
    const showNumber = document.getElementById('example-show-cnid');
    const showName = document.getElementById('example-show-name');
    function showExample() {
      document.getElementById('example-cnid').textContent = showNumber.checked ? '5839 1742 6064' : '•••• •••• 6064';
      document.getElementById('example-legal-name').hidden = !showName.checked;
    }
    example.addEventListener('change', showExample);
    addEventListener('pageshow', showExample);
    showExample();
    example.hidden = false;
  }
  const search = document.getElementById('help-search');
  if (search) {
    const category = document.getElementById('help-category');
    const clear = document.getElementById('clear-search');
    const articles = [...document.querySelectorAll('.help-article')];
    function filter() {
      const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
      let count = 0;
      articles.forEach(article => {
        const text = article.textContent.toLowerCase();
        const visible = (category.value === 'All topics' || article.dataset.category === category.value) && words.every(word => text.includes(word));
        article.hidden = !visible;
        if (visible) count++;
      });
      clear.hidden = !search.value;
      document.getElementById('help-count').textContent = `${count} help ${count === 1 ? 'article' : 'articles'}`;
      document.getElementById('help-empty').hidden = count > 0;
    }
    search.addEventListener('input', filter);
    category.addEventListener('change', filter);
    clear.addEventListener('click', () => { search.value = ''; filter(); search.focus(); });
    document.getElementById('reset-search').addEventListener('click', () => { search.value = ''; category.value = 'All topics'; filter(); search.focus(); });
    const copy = document.querySelector('[data-copy-email]');
    copy.addEventListener('click', async () => {
      const feedback = document.querySelector('[data-copy-feedback]');
      try {
        await navigator.clipboard.writeText(copy.dataset.copyEmail);
        feedback.textContent = 'Email address copied.';
        copy.textContent = 'Copied';
      } catch {
        feedback.textContent = 'Copy unavailable. Select the email address above to copy it.';
      }
    });
  }
})();
