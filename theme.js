(() => {
  let saved;
  try { saved = localStorage.getItem('cloud-nations-theme'); } catch {}
  const theme = ['light', 'dark'].includes(saved) ? saved : matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = theme;
})();
