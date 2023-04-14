import { useEffect, FC } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './reset-password.module.css';
import { useState } from "react";
import FormAuth from "../../components/form-auth/form-auth";
import ModalError from '../../components/modal-error/modal-error';

import { updatePassword } from "../../redux/actions/actionsAuth";
import { useDispatch, useSelector } from '../../redux/types/hooks';
import { TOnChange } from '../../services/types';

const ResetPassword: FC = () => {
    interface IUserState {
        newPassword: string,
        recoveryCode: string
    };
    const [userState, setUserState] = useState<IUserState>({
        newPassword: '',
        recoveryCode: ''
    });
    const navigate = useNavigate();

    const onChangeUserState: TOnChange = (e) => {
        const { name, value } = e.target;
        setUserState((userState) => ({ ...userState, [name]: value }));
    };
    //redux
    const isUpdatePassword = useSelector((store) => store.authReducer.isUpdatePassword);
    const updatePasswordFailed = useSelector((store) => store.authReducer.updatePasswordFailed);
    const accessToken = useSelector((store) => store.authReducer.accessToken);
    const dispatch = useDispatch();

    const handlerSubmit = () => {
        const { newPassword, recoveryCode } = userState;
        dispatch(updatePassword({ password: newPassword, token: recoveryCode }, { onSuccess: () => navigate("/login") }) as any);
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