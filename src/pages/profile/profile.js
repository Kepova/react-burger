import { useEffect } from 'react';
import PersonalAccount from "../../components/personal-account/personal-account";
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile.module.css';
import { useState } from "react";
import { updateDataUser } from "../../redux/actions/actionsAuth";
import { useDispatch, useSelector } from 'react-redux';
import Preloader from '../../components/preloader/preloader';

const Profile = () => {
    const [userState, setUserState] = useState({
        userName: '',
        userEmail: '',
        userPassword: ''
    });
    const [isChange, setIsChange] = useState(true);

    const onChangeUserState = (e) => {
        const { name, value } = e.target;
        setUserState((userState) => ({ ...userState, [name]: value }));
    };

    //redux
    const { dataUser, accessToken } = useSelector((store) => ({
        dataUser: store.authReducer.dataUser,
        accessToken: store.authReducer.accessToken,
    }));
    const dispatch = useDispatch();

    //заполнить поля данными пользователя
    const setDataUser = () => {
        const { name, email } = dataUser;
        setUserState((userState) => ({ ...userState, userName: name, userEmail: email }));
    };

    useEffect(() => {
        if (dataUser?.name) {
            setDataUser();
        }
    }, [dataUser]);

    const handleClickCancel = () => {
        setDataUser();
        setUserState({ ...userState, userPassword: '' });
    };

    //сопоставление данных пользователя
    useEffect(() => {
        if ((userState.userName !== dataUser.name)
            || (userState.userEmail !== dataUser.email)
            || (userState.userPassword !== '')) {
            setIsChange(false);
        } else {
            setIsChange(true);
        }
    }, [dataUser, userState]);

    //изменить данные пользователя
    const hendleClickSubmit = (e) => {
        e.preventDefault();
        let newDataUser;
        if (userState.userName !== dataUser.name) {
            newDataUser = { ...newDataUser, name: userState.userName }
        }
        if (userState.userEmail !== dataUser.email) {
            newDataUser = { ...newDataUser, email: userState.userEmail }
        }
        if (userState.userPassword !== '') {
            newDataUser = { ...newDataUser, password: userState.userPassword }
        }
        console.log(newDataUser)
        dispatch(updateDataUser(newDataUser, accessToken));
    };

    return (
        <PersonalAccount>
            <>
                {!dataUser?.name ? <Preloader />
                    :
                    <div className={`${styles.inputsContainer}`}>
                        <div className={`${styles.inputs}`}>
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
                        </div>
                        <Button htmlType="button"
                            type="secondary"
                            size="small"
                            extraClass={`${isChange ? `${styles.buttonHidden}` : `text_type_main-default`}`}
                            onClick={handleClickCancel}
                        >
                            Отменить
                        </Button>
                        <Button htmlType="submit"
                            type="primary"
                            size="small"
                            extraClass={`${isChange ? `${styles.buttonHidden}` : `${styles.buttonSave} text_type_main-default ml-2`}`}
                            onClick={(e) => hendleClickSubmit(e)}
                        >
                            Сохранить
                        </Button>
                    </div>

                }
            </>
        </PersonalAccount>
    )
};

export default Profile;