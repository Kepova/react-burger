import { useEffect, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './forgot-password.module.css';
import { useState } from "react";
import FormAuth from "../../components/form-auth/form-auth";
import ModalError from "../../components/modal-error/modal-error";
import { useDispatch, useSelector } from '../../redux/types/hooks';
import { forgotPassword } from "../../redux/actions/actionsAuth";
import { TOnChange } from "../../services/types";
import { getCookie } from "../../utils/cookies-auth";

const ForgotPassword: FC = () => {
    interface IUserState {
        userEmail: string,
    };
    const [userState, setUserState] = useState<IUserState>({
        userEmail: ''
    });
    const navigate = useNavigate();

    const onChangeUserState: TOnChange = (e) => {
        const { name, value } = e.target;
        setUserState((userState) => ({ ...userState, [name]: value }));
    };

    //redux
    const accessToken =  getCookie('accessToken');
    const forgotPasswordFailed = useSelector((store) => store.authReducer.forgotPasswordFailed);
    const isUpdatePassword = useSelector(store => store.authReducer.isUpdatePassword);

    const dispatch = useDispatch();

    const handlerSubmit = () => {
        dispatch(forgotPassword(userState.userEmail));
    };

    useEffect(() => {
        if (accessToken) {
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