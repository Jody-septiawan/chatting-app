import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
