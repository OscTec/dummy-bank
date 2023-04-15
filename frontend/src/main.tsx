import React from 'react';
import ReactDom from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from './App';
import Accounts from './pages/Accounts';
import Auth from './pages/Auth';
import Transactions from './pages/Transactions';
import Transfer from './pages/Transfer';
import Dashboard from './pages/Dashboard';
import Logout from './components/Logout';

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/auth",
        element: <Auth />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "/",
            element: <Accounts />,
          },
          {
            path: "/transactions",
            element: <Transactions />,
          },
          {
            path: "/transfer",
            element: <Transfer />,
          },
        ]
      }
    ],
  },
]);

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
