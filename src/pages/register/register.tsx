import { useEffect, FC } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register.module.css';
import { useState } from "react";
import FormAuth from "../../components/form-auth/form-auth";
import { createNewUser } from "../../redux/actions/actionsAuth";
import { useDispatch, useSelector } from '../../redux/types/hooks';
import ModalError from "../../components/modal-error/modal-error";
import { TOnChange } from '../../services/types';
import { getCookie } from '../../utils/cookies-auth';

const Register: FC = () => {
    interface IUserState {
        userName: string,
        userEmail: string,
        userPassword: string,
    };
    const [userState, setUserState] = useState<IUserState>({
        userName: '',
        userEmail: '',
        userPassword: ''
    });

    const onChangeUserState: TOnChange = (e) => {
        const { name, value } = e.target;
        setUserState((userState) => ({ ...userState, [name]: value }));
    };

    const navigate = useNavigate();

    //redux
    const createUserFailed = useSelector((store) => store.authReducer.createUserFailed);
    const accessToken = getCookie('accessToken');
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken) {
            navigate('/')
        }
    }, [accessToken]);

    const handlerSubmit = () => {
        const { userName, userEmail, userPassword } = userState;
        dispatch(createNewUser({ userName, userEmail, userPassword }));
    };

    return (
        <div className={`${styles.container}`}>
            {createUserFailed && <ModalError openError={createUserFailed} />}
            <FormAuth title={'Регистрация'} nameButton={'Зарегистрироваться'} onSubmit={handlerSubmit}>
                <>
                    <Input value={userState.userName}
                        name={'userName'}
                        type={'text'}
                        placeholder='Имя'
                        onChange={e => onChangeUserState(e)} />
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
                Уже зарегистрировались?
                <Link to='/login' className={`${styles.link} pl-2`}>
                    Войти
                </Link>
            </p>
        </div>
    )
};

export default Register;