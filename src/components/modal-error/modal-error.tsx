import { FC } from 'react';
import style from './modal-error.module.css';
import { TModalError } from '../../services/types';

const ModalError: FC<TModalError> = ({ openError }) => {
    return (
        <>
            {(openError !== null) &&
                <p className={`${style.errMessage} text text_type_main-default`}>
                    {openError}
                </p>}
        </>
    )
};

export default ModalError;