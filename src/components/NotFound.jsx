import { useEffect } from 'react';

export function isPortfolioPath(pathname) {
  return pathname === '/' || pathname === '/index.html';
}

export default function NotFound() {
  useEffect(() => { document.title = '404 — Page not found | Pranav Swaroop Gundla'; }, []);

  return (
    <main className="not-found" id="main">
      <p className="not-found-code"><span aria-hidden="true" />404</p>
      <h1>Page Not Found</h1>
      <div className="not-found-art" aria-hidden="true">
        <span>4</span>
        <svg viewBox="0 0 200 200">
          {Array.from({ length: 10 }, (_, index) => (
            <ellipse key={index} cx="100" cy="35" rx="12" ry="34" transform={`rotate(${index * 36} 100 100)`} />
          ))}
        </svg>
        <span>4</span>
      </div>
      <p className="not-found-description">The page you are looking for doesn’t exist or has been moved.</p>
      <a className="not-found-home" href="/">Go to Home Page</a>
    </main>
  );
}
