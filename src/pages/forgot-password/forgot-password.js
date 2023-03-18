import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forgot-password.module.css';
import { useState } from "react";
import FormAuth from "../../components/form-auth/form-auth";
import ModalError from "../../components/modal-error/modal-error";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../redux/actions/actionsAuth";

const ForgotPassword = () => {
    const [userState, setUserState] = useState({
        userEmail: ''
    });
    const navigate = useNavigate();

    const onChangeUserState = (e) => {
        const { name, value } = e.target;
        setUserState((userState) => ({ ...userState, [name]: value }));
    };

    //redux
    const accessToken = useSelector(store => store.authReducer.accessToken);
    const forgotPasswordFailed = useSelector(store => store.authReducer.forgotPasswordFailed);
    const isUpdatePassword = useSelector(store => store.authReducer.isUpdatePassword);

    const dispatch = useDispatch();

    const handlerSubmit = () => {
        dispatch(forgotPassword(userState.userEmail));
    };

    useEffect(() => {
        if (accessToken !== null) {
            navigate('/');
        }
        if (isUpdatePassword !== null) {
            navigate('/reset-password');
        }
    }, [accessToken, isUpdatePassword]);

    return (
        <div className={`${styles.container}`}>
            {forgotPasswordFailed && <ModalError openError={forgotPasswordFailed} />}
            <FormAuth title={'Восстановление пароля'} nameButton={'Восстановить'} onSubmit={handlerSubmit}>
                <EmailInput value={userState.userEmail}
                    name={'userEmail'}
                    placeholder='Укажите e-mail'
                    onChange={e => onChangeUserState(e)} />
            </FormAuth>
            <p className={`${styles.goTo} text text_type_main-default`}>
                Вспомнили пароль?
                <Link to='/login' className={`${styles.link} pl-2`}>
                    Войти
                </Link>
            </p>
        </div>
    )
};

export default ForgotPassword;