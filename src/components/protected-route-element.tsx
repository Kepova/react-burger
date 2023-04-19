import { FC } from 'react';
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TProtectedRoute } from "../services/types";
import { getCookie } from '../utils/cookies-auth';
import Preloader from './preloader/preloader';

const ProtectedRouteElement: FC<TProtectedRoute> = ({ element }) => {
    const dataUser = useSelector((store: any) => store.authReducer.dataUser);
    const token = getCookie('token');
    if (token) { return dataUser?.name ? element : <Preloader /> }
    else {
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRouteElement;