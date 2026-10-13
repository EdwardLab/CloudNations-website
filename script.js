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
  document.querySelectorAll('[data-id-side]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-id-side]').forEach(item => {
      const selected = item === button;
      item.setAttribute('aria-pressed', String(selected));
      item.classList.toggle('selected', selected);
      document.getElementById(`id-${item.dataset.idSide}`).hidden = !selected;
    });
  }));
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
