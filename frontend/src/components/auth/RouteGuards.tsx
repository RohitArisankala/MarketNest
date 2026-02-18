import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return null;

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export const BrandRoute = () => {
    const { user, loading } = useAuth();

    if (loading) return null;

    return user && user.role === 'brand' ? <Outlet /> : <Navigate to="/login" replace />;
};
