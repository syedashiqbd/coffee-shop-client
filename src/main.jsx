import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AddCoffee from './components/AddCoffee.jsx';
import UpdateCoffee from './components/UpdateCoffee.jsx';
import Root from './Root.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AuthProvider from './provider/AuthProvider.jsx';
import Users from './components/Users.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <App></App>,
        loader: () =>
          fetch(
            'https://coffee-shop-server-j3034p3ti-syed-ashiqs-projects.vercel.app/coffee'
          ),
      },
      {
        path: '/addCoffee',
        element: <AddCoffee></AddCoffee>,
      },
      {
        path: '/updateCoffee/:id',
        element: <UpdateCoffee></UpdateCoffee>,
        loader: ({ params }) =>
          fetch(
            `https://coffee-shop-server-j3034p3ti-syed-ashiqs-projects.vercel.app/coffee/${params.id}`
          ),
      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/register',
        element: <Register></Register>,
      },
      {
        path: '/users',
        element: <Users></Users>,
        loader: () =>
          fetch(
            'https://coffee-shop-server-j3034p3ti-syed-ashiqs-projects.vercel.app/user'
          ),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
