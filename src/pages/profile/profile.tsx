import { useEffect, useState, FC } from 'react';
import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './profile.module.css';
import { updateDataUser } from "../../redux/actions/actionsAuth";
import { useDispatch, useSelector } from '../../redux/types/hooks';
import Preloader from '../../components/preloader/preloader';
import { THandlerSubmit, TOnChange } from '../../services/types';
import { TDataUser } from '../../services/api-types';

const Profile: FC = () => {
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
    const [isChange, setIsChange] = useState<boolean>(true);

    const onChangeUserState: TOnChange = (e) => {
        const { name, value } = e.target;
        setUserState((userState) => ({ ...userState, [name]: value }));
    };

    //redux
    const dataUser = useSelector((store) => store.authReducer.dataUser);
    const accessToken = useSelector((store) => store.authReducer.accessToken);
    const dispatch = useDispatch();

    //заполнить поля данными пользователя
    const setDataUser = () => {
        const { name, email } = dataUser as TDataUser;
        setUserState((userState) => ({ ...userState, userName: name, userEmail: email }));
    };

    useEffect(() => {
        if (dataUser?.name) {
            setDataUser();
        }
    }, [dataUser]);

    const handlerClickCancel = () => {
        setDataUser();
        setUserState({ ...userState, userPassword: '' });
    };

    //сопоставление данных пользователя
    useEffect(() => {
        if ((userState.userName !== dataUser?.name)
            || (userState.userEmail !== dataUser?.email)
            || (userState.userPassword !== '')) {
            setIsChange(false);
        } else {
            setIsChange(true);
        }
    }, [dataUser, userState]);

    //изменить данные пользователя
    const handlerClickSubmit: THandlerSubmit = (e) => {
        e.preventDefault();
        let newDataUser = {};
        if (userState.userName !== dataUser?.name) {
            newDataUser = { ...newDataUser, name: userState.userName }
        }
        if (userState.userEmail !== dataUser?.email) {
            newDataUser = { ...newDataUser, email: userState.userEmail }
        }
        if (userState.userPassword !== '') {
            newDataUser = { ...newDataUser, password: userState.userPassword }
        }
        dispatch(updateDataUser({ newDataUser, token: accessToken }));
    };

    return (
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
                        onClick={handlerClickCancel}
                    >
                        Отменить
                    </Button>
                    <Button htmlType="submit"
                        type="primary"
                        size="small"
                        extraClass={`${isChange ? `${styles.buttonHidden}` : `${styles.buttonSave} text_type_main-default ml-2`}`}
                        onClick={(e) => handlerClickSubmit(e)}
                    >
                        Сохранить
                    </Button>
                </div>
            }
        </>
    )
};

export default Profile;