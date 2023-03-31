import React from 'react';
import ReactDom from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from './App';
import './index.css';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Accounts />,
      },
      {
        path: "/transactions",
        element: <Transactions />,
      },
    ],
  },
]);

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
