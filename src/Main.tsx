import { StrictMode, type FC } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import '@/assets/i18n/i18n.config';

const AppWrapper: FC = () => (
  <StrictMode>
    <App />
  </StrictMode>
);

const app = document.querySelector('#app');

if (app !== null) {
  const root = createRoot(app);

  root.render(<AppWrapper />);
}
