import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { MantineProvider, Text } from '@mantine/core';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* Mantine Global Provider */}
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <App />
    </MantineProvider>
  </React.StrictMode>
);

