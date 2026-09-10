export const sectionPaths = { '/': 'main', '/index.html': 'main', '/work': 'work', '/life': 'life', '/contact': 'contact', '/logo': 'logo' };

export function sectionForPath(pathname) {
  return sectionPaths[pathname.replace(/\/$/, '') || '/'];
}

export function setupSectionNavigation() {
  const scroll = (focus = false, behavior = 'instant') => {
    const legacyPath = Object.keys(sectionPaths).find(path => `#${sectionPaths[path]}` === window.location.hash);
    if (legacyPath) history.replaceState(null, '', legacyPath + window.location.search);
    if (window.location.hash) return;
    const section = document.getElementById(sectionForPath(window.location.pathname));
    if (!section) return;
    if (focus) {
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    }
    section.scrollIntoView({ behavior });
  };
  const onClick = event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
    const url = new URL(link.href);
    if (url.origin !== window.location.origin || url.hash || !sectionForPath(url.pathname)) return;
    event.preventDefault();
    if (url.href !== window.location.href) history.pushState(null, '', url.pathname + url.search);
    scroll(true, 'auto');
  };
  const onHistory = () => scroll(true);
  const onLoad = () => scroll();
  const previousRestoration = history.scrollRestoration;
  history.scrollRestoration = 'manual';
  scroll();
  document.addEventListener('click', onClick);
  window.addEventListener('popstate', onHistory);
  window.addEventListener('hashchange', onHistory);
  window.addEventListener('load', onLoad);
  return () => {
    history.scrollRestoration = previousRestoration;
    document.removeEventListener('click', onClick);
    window.removeEventListener('popstate', onHistory);
    window.removeEventListener('hashchange', onHistory);
    window.removeEventListener('load', onLoad);
  };
}
