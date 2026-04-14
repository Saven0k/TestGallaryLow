import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";


interface PublicRouteProps {
    children?: React.ReactNode;
    redirectTo?: string;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ 
    children, 
    redirectTo = "/profile" 
}) => {
    const { isLoading, isAuthenticated } = useAuth();

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Загрузка...</p>
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};