(() => {
  const loader = document.getElementById('coffee-loader');
  const root = document.getElementById('root');
  if (!loader || !root) return;
  if (!['/', '/index.html'].includes(location.pathname)) {
    loader.remove();
    return;
  }

  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const wasInert = root.inert;
  let finished = false;
  loader.hidden = false;
  root.inert = true;
  document.documentElement.dataset.coffeeLoading = '';

  function finish() {
    if (finished) return;
    finished = true;
    root.inert = wasInert;
    delete document.documentElement.dataset.coffeeLoading;
    window.removeEventListener('resize', finish);
    loader.remove();
  }

  function enter() {
    const mark = loader.querySelector('.signature-loader-mark');
    const target = root.querySelector('.brand img');
    if (reduced.matches) { finish(); return; }
    const from = mark?.getBoundingClientRect();
    const to = target?.getBoundingClientRect();
    // A slow bundle or restored scroll position must never strand the intro.
    if (!from?.width || !to?.width || to.bottom <= 0 || to.top >= innerHeight) {
      loader.classList.add('is-leaving');
      setTimeout(finish, 300);
      return;
    }
    mark.style.setProperty('--logo-x', `${to.left - from.left}px`);
    mark.style.setProperty('--logo-y', `${to.top - from.top}px`);
    mark.style.setProperty('--logo-scale', `${to.width / from.width}`);
    document.documentElement.dataset.coffeeLoading = 'handoff';
    loader.classList.add('is-docking');
    // End early on resize rather than landing at stale coordinates.
    window.addEventListener('resize', finish, { once: true });
    setTimeout(finish, 700);
  }

  // Signature completes at 2.3s; hold 100ms before the 700ms handoff.
  setTimeout(enter, reduced.matches ? 300 : 2400);
})();
