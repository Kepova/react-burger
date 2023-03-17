import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password.module.css';
import { useState } from "react";
import FormAuth from "../../components/form-auth/form-auth";
import ModalError from '../../components/modal-error/modal-error';

import { updatePassword } from "../../redux/actions/actionsAuth";
import { useDispatch, useSelector } from "react-redux";

const ResetPassword = () => {
    const [userState, setUserState] = useState({
        newPassword: '',
        recoveryCode: ''
    });
    const navigate = useNavigate();

    const onChangeUserState = (e) => {
        const { name, value } = e.target;
        setUserState((userState) => ({ ...userState, [name]: value }));
    };
    //redux
    const { isUpdatePassword, updatePasswordFailed, accessToken } = useSelector((store) => ({
        isUpdatePassword: store.authReducer.isUpdatePassword,
        updatePasswordFailed: store.authReducer.updatePasswordFailed,
        accessToken: store.authReducer.accessToken
    }));
    const dispatch = useDispatch();

    const handlerSubmit = () => {
        const { newPassword, recoveryCode } = userState;
        dispatch(updatePassword(newPassword, recoveryCode));
        navigate('/login');
    };

    useEffect(() => {
        if (isUpdatePassword === null) {
            navigate('/forgot-password');
        }
        if (accessToken !== null) {
            navigate('/');
        }
    }, [accessToken]);

    return (
        <div className={`${styles.container}`}>
            {updatePasswordFailed && <ModalError openError={updatePasswordFailed} />}
            <FormAuth title={'Восстановление пароля'} nameButton={'Восстановить'} onSubmit={handlerSubmit}>
                <>
                    <PasswordInput value={userState.newPassword}
                        name={'newPassword'}
                        placeholder='Введите новый пароль'
                        onChange={e => onChangeUserState(e)} />
                    <Input value={userState.recoveryCode}
                        name={'recoveryCode'}
                        type={'text'}
                        placeholder='Введите код из письма'
                        onChange={e => onChangeUserState(e)} />
                </>
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

export default ResetPassword;