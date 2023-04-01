import { FC } from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TProtectedRoute } from "../services/types";

const ProtectedRouteElement: FC<TProtectedRoute> = ({ element }) => {
    const dataUser = useSelector((store: any) => store.authReducer.dataUser);

    return dataUser?.name ? element : <Navigate to="/login" replace />;
};

export default ProtectedRouteElement;