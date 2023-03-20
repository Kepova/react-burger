import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const ProtectedRouteElement = ({ element }) => {
    const dataUser = useSelector(store => store.authReducer.dataUser);

    return dataUser?.name ? element : <Navigate to="/login" replace />;
};

ProtectedRouteElement.propTypes = {
    element: PropTypes.element.isRequired
};

export default ProtectedRouteElement;