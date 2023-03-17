import { Navigate } from "react-router-dom";
import { getCookie } from "../utils/cookies-auth";

const ProtectedRouteElement = ({ element }) => {

    const token = getCookie('token');

    return token ? element : <Navigate to="/login" replace />;
};

export default ProtectedRouteElement;