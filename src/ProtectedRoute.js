import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, authorized }) => {
    const user = localStorage.getItem("user");
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    const userData = JSON.parse(user);
    if (!authorized.includes(userData.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default ProtectedRoute;
