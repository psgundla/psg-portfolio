import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import NotFound, { isPortfolioPath } from './components/NotFound.jsx'
import { MotionConfig } from 'motion/react'
import '@fontsource/ibm-plex-sans/latin-400.css'
import '@fontsource/ibm-plex-sans/latin-400-italic.css'
import '@fontsource/ibm-plex-sans/latin-500.css'
import '@fontsource/ibm-plex-sans/latin-600.css'

function Page() {
  const [location, setLocation] = React.useState(() => window.location.href);
  React.useEffect(() => {
    const update = () => setLocation(window.location.href);
    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('hashchange', update);
    };
  }, []);
  const url = new URL(location);
  return isPortfolioPath(url.pathname, url.hash) ? <App /> : <NotFound />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <Page />
    </MotionConfig>
  </React.StrictMode>,
)
