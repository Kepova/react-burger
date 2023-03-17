import { NavLink } from "react-router-dom";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

function AppHeader() {

    return (
        <header className={`${styles.header} pt-4 pb-4`}>
            <nav className={`${styles.header__nav} pt-4 pb-4`}>
                <ul className={`${styles.header__items}`}>
                    <li className={`${styles.header__item} pl-5 pr-5 text text_type_main-default`}>
                        <NavLink to='/'
                            className={`${styles.header__link}`}>
                            {({ isActive }) => (
                                <>
                                    <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                                    <span className="pl-2"
                                        style={{ color: isActive ? '#F2F2F3' : '#8585AD' }}>Конструктор</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li className={`${styles.header__item} pl-5 pr-5 text text_type_main-default`}>
                        <NavLink to='/profile/orders'
                            className={`${styles.header__link}`}>
                            {({ isActive }) => (
                                <>
                                    <ListIcon type={isActive ? 'primary' : 'secondary'} />
                                    <span className="pl-2"
                                        style={{ color: isActive ? '#F2F2F3' : '#8585AD' }}>Лента заказов</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                    <li className={`${styles.header__item} ${styles.header__itemProfile} pl-5 pr-5 text text_type_main-default`}>
                        <NavLink to='/profile' end
                            className={`${styles.header__link}`}>
                            {({ isActive }) => (
                                <>
                                    <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
                                    <span className="pl-2"
                                        style={{ color: isActive ? '#F2F2F3' : '#8585AD' }}>Личный кабинет</span>
                                </>
                            )}
                        </NavLink>
                    </li>
                </ul>
                <div className={styles.logo}>
                    <Logo />
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;
