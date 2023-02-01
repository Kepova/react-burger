import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './modal.module.css';

const modalRoot = document.getElementById('modals');

const Modal = ({ handleClickClose, isOpenModal, title, children }) => {

    const closeModalClick = (e) => {
        e.stopPropagation();
        handleClickClose();
    };

    const escClick = (e) => {
        console.log(e.key)
        if (e.key === "Escape") {
            handleClickClose();
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
            {isOpenModal &&
                <>
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
                </>
            }
        </div>,
        modalRoot
    )
};

Modal.propTypes = {
    title: PropTypes.string,
    children: PropTypes.element.isRequired,
    isOpenModal: PropTypes.bool.isRequired,
    handleClickClose: PropTypes.func.isRequired
};

export default Modal;