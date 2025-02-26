import { Navigate, Routes, Route } from 'react-router-dom'
import { JSX, useEffect } from 'react';
import { useUserStore } from './stores/userStore';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';


function PrivateRoute({ element }: { element: JSX.Element }) {
    const user = useUserStore((state) => state.user);
    return user ? element : <Navigate to="/auth" replace />;
}

function AuthAccess({ element }: { element: JSX.Element }) {
    const user = useUserStore((state) => state.user);
    return user ? <Navigate to="/" replace /> : element;
}
function App() {
    const { getUser } = useUserStore();

    useEffect(() => {
        getUser();
    }, []);

    return (
        <Routes>
            <Route path="/auth" element={<AuthAccess element={<AuthPage />} />} />
            <Route path="/profile" element={<PrivateRoute element={<ProfilePage />} />} />
            {/*<Route path="/" element={<PrivateRoute element={<Home />} />} />*/}
        </Routes>
    );
}

export default App;