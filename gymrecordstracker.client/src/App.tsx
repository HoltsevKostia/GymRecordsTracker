import { Navigate,  createBrowserRouter, RouterProvider } from 'react-router-dom'
import { JSX, useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import './App.css'
import HomePage from './pages/HomePage';
import { useUserStore } from './stores/userStore';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';

function PrivateRoute({ element }: { element: JSX.Element }) {
    const { user, loading } = useUserStore();
    if (loading) {
        return <div>Loading...</div>;
    }
    if (user == null) {
        return <Navigate to="/auth" replace />;
    }

    return element;
}

function  AuthAccess({ element }: { element: JSX.Element }) {
    const { user, loading} = useUserStore();
    if (loading) return <div>Loading...</div>;
    if (user !== null) return <Navigate to="/" replace />;
    else return element;
}

function App() {
    const { getUser, loading } = useUserStore();

    useEffect(() => {
        getUser();
    }, []);

    if (loading) return <div>Loading...</div>;

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            errorElement: <NotFound />,
            children: [
                { path: "/", element: <PrivateRoute element={<HomePage />} /> },
                { path: "/auth", element: <AuthAccess element={<AuthPage />} /> },
                { path: "/profile", element: <PrivateRoute element={<ProfilePage />} /> },
            ]
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;