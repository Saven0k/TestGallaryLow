
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

interface ProtectedRouteProps {
    children?: React.ReactNode;
    allowedRoles?: Array<'admin' | 'moderator' | 'artist' | 'visitor' | 'user'>;
    redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    allowedRoles = [],
    redirectTo = "/login"
}) => {
    const { user, isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Загрузка...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
        return <Navigate to="/profile" replace />;
    }


    return children ? <>{children}</> : <Outlet />;
};