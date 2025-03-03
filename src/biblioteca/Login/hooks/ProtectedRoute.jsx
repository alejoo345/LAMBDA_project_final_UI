import { Navigate, useLocation } from "react-router-dom";

console.log("ProtectedRoute.js cargado correctamente");  // 👈 Agregar esto para depuración

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isAuthenticated = !!localStorage.getItem('token');

    if (!isAuthenticated) {
        return <Navigate to="/" state={{ from: location }} />;
    }
    return children;
};

export default ProtectedRoute;
