import { FC } from 'react';
import style from './modal-overlay.module.css';
import { TModalOverlay } from '../../services/types';

const ModalOverlay: FC<TModalOverlay> = ({ handleClickClose }) => {

    return (
        <div className={style.modalOverlay} onClick={handleClickClose}>
        </div>
    )
};

export default ModalOverlay;