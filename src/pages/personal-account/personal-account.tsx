import { FC } from 'react';
import { NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './personal-account.module.css';
import { useDispatch } from '../../redux/types/hooks';
import { loggingOutUser } from "../../redux/actions/actionsAuth";
import { getCookie } from "../../utils/cookies-auth";

const PersonalAccount: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickOut = () => {
        const token = getCookie('token');
        dispatch(loggingOutUser(token, { onSuccess: () => navigate("/login") }));
    };

    const descriptionSection = () => {
        if (location.pathname === '/profile') {
            return `В этом разделе вы можете
            изменить свои персональные данные`
        }
        if (location.pathname === '/profile/orders') {
            return `В этом разделе вы можете 
            просмотреть свою историю заказов`
        }
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.profile}`}>
                <div className={`${styles.navContainer} pr-15`}>
                    <ul className={`${styles.navList}`}>
                        <li className={`${styles.navItem}`}>
                            <NavLink to="/profile" end
                                className={`text text_type_main-medium ${styles.link}`}
                                style={({ isActive }) => { return { color: isActive ? '#F2F2F3' : '#8585AD' } }}
                            >
                                Профиль</NavLink>
                        </li>
                        <li className={`${styles.navItem}`}>
                            <NavLink to="/profile/orders" className={`text text_type_main-medium ${styles.link}`}
                                style={({ isActive }) => { return { color: isActive ? '#F2F2F3' : '#8585AD' } }}>
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
                    <p className={`${styles.description} text text_type_main-default`}>
                        {descriptionSection()}
                    </p>
                </div >
                <Outlet />
            </div >
        </div>
    )
};

export default PersonalAccount;