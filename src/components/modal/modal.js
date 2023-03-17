import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/actions/actions';

const modalRoot = document.getElementById('modals');

const Modal = ({
    title,
    children }) => {
    const navigate = useNavigate();

    //redux
    const dispatch = useDispatch();
    const { currentIngredient } = useSelector(store => ({
        currentIngredient: store.ingredientsReducer.currentIngredient
    }));

    const closeModalClick = (e) => {
        e.stopPropagation();
        dispatch(closeModal());
        if (currentIngredient?._id) {
            navigate(-1);
        }
    };

    const escClick = (e) => {
        if (e.key === "Escape") {
            closeModalClick(e);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', escClick);

        return () => {
            document.removeEventListener('keydown', escClick);
        }
    });

    return createPortal(
        <div className={`${style.modalContainer}`}>
            <div className={`${style.modalWrapper}`}>
                <div className={`${style.modal} p-10 pb-15`}>
                    <div className={`${style.modalTitleContainer}`}>
                        <h2 className={`text text_type_main-large`}>{title}</h2>
                        <div className={`${style.ikonClose}`} >
                            <CloseIcon type="primary"
                                onClick={closeModalClick}
                            />
                        </div>
                    </div>
                    {children}
                </div>
                < ModalOverlay handleClickClose={closeModalClick} />
            </div>
        </div>,
        modalRoot
    )
};

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
};

export default Modal;