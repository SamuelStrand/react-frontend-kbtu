import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import Home from './pages/Home';
import About from './pages/About';
import ItemsList from './pages/ItemsList';
import ItemDetails from './pages/ItemDetails';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'items', element: <ItemsList /> },
      { path: 'items/:id', element: <ItemDetails /> },
      { path: 'login', element: <Login /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
