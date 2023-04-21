import { FC } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from '../redux/types/hooks';
import { TProtectedRoute } from "../services/types";
import { getCookie } from '../utils/cookies-auth';
import Preloader from './preloader/preloader';

const ProtectedRouteElement: FC<TProtectedRoute> = ({ element }) => {
    const location = useLocation();
    const dataUser = useSelector((store) => store.authReducer.dataUser);
    const token = getCookie('accessToken');
    
    if (token) {
        return dataUser?.name ? element : <Preloader /> }
    else {
        return <Navigate to="/login" state={{from: location}} />;
    }
};

export default ProtectedRouteElement;