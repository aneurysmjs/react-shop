import { FC, StrictMode } from 'react';

import Routing from '@/routing';
import QueryProvider from '@/providers/QueryProvider';

import './assets/css/styles.css';

const App: FC = () => (
  <StrictMode>
    <QueryProvider>
      <Routing />
    </QueryProvider>
  </StrictMode>
);

export default App;
