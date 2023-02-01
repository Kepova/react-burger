import { NavLink } from "react-router-dom";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './app-header.module.css';

function AppHeader() {

    return (

        <header className={`${appHeaderStyles.header} pt-4 pb-4`}>
            <nav className={`${appHeaderStyles.header__nav} pt-4 pb-4`}>
                <ul className={`${appHeaderStyles.header__items}`}>
                    <li className={`${appHeaderStyles.header__item} pl-5 pr-5 text text_type_main-default`}>
                        <BurgerIcon />
                        <NavLink to='/' className={`${appHeaderStyles.header__link} pl-2`}>Конструктор</NavLink>
                    </li>
                    <li className={`${appHeaderStyles.header__item} pl-5 pr-5 text text_type_main-default`}>
                        <ListIcon />
                        <NavLink to='/' className={`${appHeaderStyles.header__link} pl-2`}>Лента заказов</NavLink>
                    </li>
                    <li className={`${appHeaderStyles.header__item} ${appHeaderStyles.header__itemProfile} pl-5 pr-5 text text_type_main-default`}>
                        <ProfileIcon />
                        <NavLink to='/' className={`${appHeaderStyles.header__link} pl-2`}>Личный кабинет</NavLink>
                    </li>
                </ul>
                <div className={appHeaderStyles.logo}>
                    <Logo />
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;
