import React from 'react';
import {
    RouterProvider,
    createBrowserRouter,
} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import ItemsPage from './pages/Items';
import ItemDetailsPage from './pages/ItemDetails';
import LoginPage from './pages/Login';
import NotFoundPage from './pages/NotFound';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'items', element: <ItemsPage /> },
            { path: 'items/:id', element: <ItemDetailsPage /> },
            { path: 'login', element: <LoginPage /> },
            { path: '*', element: <NotFoundPage /> },
        ],
    },
]);

export default function App() {
    return <RouterProvider router={router} />;
}
