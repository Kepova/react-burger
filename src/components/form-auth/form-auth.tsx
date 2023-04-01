import { FC } from "react";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './form-auth.module.css';
import { TFormAuth, THandlerSubmit } from "../../services/types";

const FormAuth: FC<TFormAuth> = ({ title, nameButton, children, onSubmit }) => {
    const handlerSubmit: THandlerSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    }

    return (
        <>
            <h2 className={`${styles.title} text text_type_main-medium`}>{title}</h2>
            <form className={`${styles.form}`} onSubmit={(e) => handlerSubmit(e)}>
                <div className={`${styles.inputs} pt-6 pb-6`}>
                    {children}
                </div>
                <Button htmlType="submit" extraClass={`${styles.button}`} >{nameButton}</Button>
            </form>
        </>
    )
};

export default FormAuth;