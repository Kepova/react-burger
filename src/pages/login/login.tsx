import { useEffect, useState, FC } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './login.module.css';
import FormAuth from "../../components/form-auth/form-auth";
import ModalError from "../../components/modal-error/modal-error";
import { authUser } from "../../redux/actions/actionsAuth";
import { useDispatch, useSelector } from '../../redux/types/hooks';
import { LocationState, TOnChange } from '../../services/types';
import { getCookie } from '../../utils/cookies-auth';

const Login: FC = () => {
    const location = useLocation();
    interface IUserState {
        userEmail: string,
        userPassword: string,
    };
    const [userState, setUserState] = useState<IUserState>({
        userEmail: '',
        userPassword: ''
    });

    const onChangeUserState: TOnChange = (e) => {
        const { name, value } = e.target;
        setUserState((userState) => ({ ...userState, [name]: value }));
    };

    const navigate = useNavigate();

    //redux
    const loginUserFailed = useSelector((store) => store.authReducer.loginUserFailed);
    const accessToken = getCookie('accessToken');
    const dispatch = useDispatch();
    const urlAfterAuth = (location.state as LocationState).from || '/';

    const handlerSubmit = () => {
        const { userEmail, userPassword } = userState;
        dispatch(authUser({ userEmail, userPassword }, { onLoginSuccess: () => navigate(urlAfterAuth) }));
    };

    useEffect(() => {
        if (accessToken) {
            navigate('/')
        }
    }, [accessToken]);

    return (
        <div className={`${styles.container}`}>
            {loginUserFailed && <ModalError openError={loginUserFailed} />}
            <FormAuth title={'Вход'} nameButton={'Войти'} onSubmit={handlerSubmit} >
                <>
                    <EmailInput value={userState.userEmail}
                        name={'userEmail'}
                        placeholder='E-mail'
                        onChange={e => onChangeUserState(e)} />
                    <PasswordInput value={userState.userPassword}
                        name={'userPassword'}
                        placeholder='Пароль'
                        onChange={e => onChangeUserState(e)} />
                </>
            </FormAuth>
            <p className={`${styles.goTo} text text_type_main-default`}>
                Вы - новый пользователь?
                <Link to='/register' className={`${styles.link} pl-2`}>
                    Зарегистрироваться
                </Link>
            </p>
            <p className={`${styles.goTo} text text_type_main-default`}>
                Забыли пароль?
                <Link to='/forgot-password' className={`${styles.link} pl-2`}>
                    Восстановить пароль
                </Link>
            </p>
        </div>
    )
};

export default Login;