import React from 'react';
import ReactDom from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from './App';
import './index.css';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions';
import Transfer from './pages/Transfer';

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
      {
        path: "/transfer",
        element: <Transfer />,
      }
    ],
  },
]);

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
