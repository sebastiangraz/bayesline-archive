import React from 'react';
import ReactDOM from 'react-dom/client';
import { routeTree } from './routeTree.gen';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { HelmetProvider } from 'react-helmet-async';
import './global.css';

const router = createRouter({
  routeTree,
  context: {
    themeValue: 0,
    title: '',
    description: ''
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);
