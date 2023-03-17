import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './personal-account.module.css';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { loggingOutUser } from "../../redux/actions/actionsAuth";
import { getCookie } from "../../utils/cookies-auth";

export function PersonalAccount({ children }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickOut = () => {
        const token = getCookie('token');
        dispatch(loggingOutUser(token));
        navigate('/login');
    };

    return (
        <div className={`${styles.profile}`}>
            <div className={`${styles.navContainer} pr-15`}>
                <ul className={`${styles.navList}`}>
                    <li className={`${styles.navItem}`}>
                        <NavLink to="/profile" end
                            className={`text text_type_main-medium ${styles.link}`}
                            style={({ isActive }) => { return { color: isActive && '#F2F2F3' } }}
                        >
                            Профиль</NavLink>
                    </li>
                    <li className={`${styles.navItem}`}>
                        <NavLink to="/profile/orders" className={`text text_type_main-medium ${styles.link}`}
                            style={({ isActive }) => { return { color: isActive && '#F2F2F3' } }}>
                            История заказов</NavLink>
                    </li>
                    <li className={`${styles.navItem}`}>
                        <Button htmlType="submit"
                            type="secondary"
                            size="small"
                            extraClass={`${styles.link} text_type_main-medium`}
                            onClick={handleClickOut}
                        >Выход</Button>
                    </li>
                </ul>
                <p className={`${styles.description} text text_type_main-default`}>В этом разделе вы можете
                    изменить свои персональные данные
                </p>
            </div >
            {children}
        </div >
    )
};

PersonalAccount.propTypes = {
    children: PropTypes.element.isRequired,
};

export default PersonalAccount;