import { Navigate, Routes, Route } from 'react-router-dom'
import { JSX, useEffect } from 'react';
import { useUserStore } from './stores/userStore';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import './App.css'
import HomePage from './pages/HomePage';
import { useAuth } from './hooks/useAuth';

function PrivateRoute({ element }: { element: JSX.Element }) {
    const { user } = useAuth();
    return user ? element : <Navigate to="/auth" replace />;
}

function AuthAccess({ element }: { element: JSX.Element }) {
    const { user } = useAuth();
    return user ? <Navigate to="/" replace /> : element;
}
function App() {
    const { user } = useAuth();

    useEffect(() => {
        user;
    }, []);

    return (
        <Routes>
            <Route path="/auth" element={<AuthAccess element={<AuthPage />} />} />
            <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
            <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
        </Routes>
    );
}

export default App;