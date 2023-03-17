import { useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Input, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './register.module.css';
import { useState } from "react";
import FormAuth from "../../components/form-auth/form-auth";
import { createNewUser } from "../../redux/actions/actionsAuth";
import { useDispatch, useSelector } from 'react-redux';
import ModalError from "../../components/modal-error/modal-error";

const Register = () => {
    const [userState, setUserState] = useState({
        userName: '',
        userEmail: '',
        userPassword: ''
    });

    const onChangeUserState = (e) => {
        const { name, value } = e.target;
        setUserState((userState) => ({ ...userState, [name]: value }));
    };

    const navigate = useNavigate();

    //redux
    const { createUserFailed, accessToken } = useSelector((store) => ({
        createUserFailed: store.authReducer.createUserFailed,
        accessToken: store.authReducer.accessToken
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessToken !== null) {
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